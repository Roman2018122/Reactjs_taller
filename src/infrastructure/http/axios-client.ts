// src/infrastructure/http/axios-client.ts

import axios, { type AxiosRequestConfig } from 'axios'

import { ApiException } from '@/domain/exceptions/api.exception'
import { API_CONFIG } from '@/infrastructure/config/api.config'
import { localTokenStorage } from '@/infrastructure/storage/local-token-storage'

import { parseApiError } from './parse-api-error'

/**
 * Evento disparado cuando la sesión expira definitivamente.
 * Más adelante el AuthStore escuchará este evento.
 */
export const AUTH_EXPIRED_EVENT = 'authExpired'

/** Información enviada dentro del evento authExpired. */
export interface AuthExpiredEventDetail {
  reason: string
}

/**
 * Cliente HTTP principal de la aplicación.
 * Todas las solicitudes al backend deben utilizar esta instancia.
 */
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Interceptor de petición ────────────────────────────────────────────────

/**
 * Añade automáticamente el access token a las peticiones.
 */
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localTokenStorage.getAccessToken()

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error: unknown) => {
    return Promise.reject(parseApiError(error))
  },
)

// ─── Interceptor de respuesta ───────────────────────────────────────────────

/**
 * Indica si actualmente se está solicitando un nuevo access token.
 */
let isRefreshing = false

/**
 * Peticiones que están esperando a que finalice el refresh.
 */
interface RefreshSubscriber {
  resolve: (token: string) => void
  reject: (error: ApiException) => void
}

let refreshSubscribers: RefreshSubscriber[] = []

/**
 * Añade una petición a la cola de espera.
 */
function subscribeTokenRefresh(
  resolve: (token: string) => void,
  reject: (error: ApiException) => void,
): void {
  refreshSubscribers.push({ resolve, reject })
}

/**
 * Entrega el nuevo access token a las peticiones pendientes.
 */
function notifyRefreshSuccess(token: string): void {
  refreshSubscribers.forEach((subscriber) => {
    subscriber.resolve(token)
  })

  refreshSubscribers = []
}

/**
 * Rechaza todas las peticiones pendientes cuando falla el refresh.
 */
function notifyRefreshFailure(error: ApiException): void {
  refreshSubscribers.forEach((subscriber) => {
    subscriber.reject(error)
  })

  refreshSubscribers = []
}

/**
 * Dispara el evento que informa que la sesión expiró.
 */
function dispatchAuthExpired(reason: string): void {
  const event = new CustomEvent<AuthExpiredEventDetail>(
    AUTH_EXPIRED_EVENT,
    {
      detail: { reason },
    },
  )

  window.dispatchEvent(event)
}

/**
 * Configuración extendida para marcar una petición reintentada.
 */
interface RetryRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

apiClient.interceptors.response.use(
  (response) => response,

  async (error: unknown) => {
    const axiosError = error as {
      config?: RetryRequestConfig
      response?: {
        status?: number
      }
    }

    const originalRequest = axiosError.config

    /*
     * Si no existe configuración, no se puede reintentar.
     * También ignoramos errores distintos de 401.
     */
    if (
      !originalRequest ||
      axiosError.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(parseApiError(error))
    }

    /*
     * No intentamos refrescar el token cuando el error viene
     * directamente del endpoint de inicio de sesión.
     */
    if (originalRequest.url === '/token/') {
      return Promise.reject(parseApiError(error))
    }

    originalRequest._retry = true

    const refreshToken = localTokenStorage.getRefreshToken()

    if (!refreshToken) {
      localTokenStorage.clearTokens()

      dispatchAuthExpired('No refresh token available')

      return Promise.reject(
        new ApiException(
          401,
          'Sesión expirada. Por favor inicia sesión nuevamente.',
        ),
      )
    }

    /*
     * Si ya existe un refresh en progreso, la petición espera
     * el resultado en lugar de enviar otra solicitud de refresh.
     */
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        subscribeTokenRefresh(resolve, reject)
      }).then((newAccessToken) => {
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        }

        return apiClient(originalRequest)
      })
    }

    isRefreshing = true

    try {
      /*
       * Se utiliza axios directamente para evitar que esta petición
       * pase por los interceptores del apiClient.
       *
       * BASE_URL ya contiene /api, por eso la ruta es /token/refresh/.
       */
      const response = await axios.post<{ access: string }>(
        `${API_CONFIG.BASE_URL}/token/refresh/`,
        {
          refresh: refreshToken,
        },
        {
          timeout: API_CONFIG.TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const newAccessToken = response.data.access

      localTokenStorage.setTokens(newAccessToken, refreshToken)

      notifyRefreshSuccess(newAccessToken)

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      }

      return apiClient(originalRequest)
    } catch {
      const sessionExpiredError = new ApiException(
        401,
        'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
      )

      localTokenStorage.clearTokens()

      notifyRefreshFailure(sessionExpiredError)

      dispatchAuthExpired('Refresh token invalid or expired')

      return Promise.reject(sessionExpiredError)
    } finally {
      isRefreshing = false
    }
  },
)