// src/infrastructure/http/parse-api-error.ts

import type { AxiosError } from "axios";

import { ApiException } from "@/domain/exceptions/api.exception";

/** Forma esperada de las respuestas de error de Django REST Framework. */
interface DjangoErrorResponse {
  detail?: string;
  non_field_errors?: string[];
  [field: string]: string[] | string | undefined;
}

/** Mapa de mensajes amigables por código HTTP. */
const HTTP_MESSAGES: Record<number, string> = {
  400: "Solicitud incorrecta.",
  401: "Credenciales incorrectas. Verifica tu usuario y contraseña.",
  403: "No tienes permisos para realizar esta acción.",
  404: "El recurso solicitado no fue encontrado.",
  405: "Método no permitido.",
  409: "Conflicto con el estado actual del recurso.",
  429: "Demasiadas solicitudes. Intenta de nuevo en unos momentos.",
  500: "Error interno del servidor. Intenta más tarde.",
  502: "El servidor no está disponible. Intenta más tarde.",
  503: "Servicio temporalmente no disponible.",
};

/**
 * Extrae el mensaje más descriptivo de la respuesta Django.
 */
function extractDjangoMessage(
  data: DjangoErrorResponse,
): string | null {
  if (data?.detail) {
    return String(data.detail);
  }

  if (data?.non_field_errors?.length) {
    return data.non_field_errors[0];
  }

  return null;
}

/**
 * Extrae errores por campo de la respuesta Django (400).
 */
function extractFieldErrors(
  data: DjangoErrorResponse,
): Record<string, string[]> | undefined {
  const fieldErrors: Record<string, string[]> = {};

  for (const [key, value] of Object.entries(data)) {
    if (key === "detail" || key === "non_field_errors") {
      continue;
    }

    if (Array.isArray(value)) {
      fieldErrors[key] = value.map(String);
    }
  }

  return Object.keys(fieldErrors).length > 0
    ? fieldErrors
    : undefined;
}

/**
 * Detecta si el error es de timeout de Axios.
 */
function isTimeoutError(
  axiosError: AxiosError,
): boolean {
  return (
    axiosError.code === "ECONNABORTED" ||
    axiosError.message?.includes("timeout")
  );
}

/**
 * Detecta si el error es de conexión (sin respuesta del servidor).
 */
function isConnectionError(
  axiosError: AxiosError,
): boolean {
  return !axiosError.response && !isTimeoutError(axiosError);
}

/**
 * Convierte cualquier error en un ApiException con el mensaje
 * más descriptivo posible, evitando mensajes genéricos como "Error 500".
 */
export function parseApiError(error: unknown): ApiException {
  const axiosError = error as AxiosError<DjangoErrorResponse>;

  // Timeout
  if (isTimeoutError(axiosError)) {
    return new ApiException(
      0,
      "La solicitud tardó demasiado. Verifica tu conexión e intenta de nuevo.",
    );
  }

  // Sin respuesta del servidor (error de conexión real)
  if (isConnectionError(axiosError)) {
    return new ApiException(
      0,
      "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
    );
  }

  const { status, data } = axiosError.response!;

  // Intentar extraer mensaje descriptivo de Django
  const djangoMessage = data ? extractDjangoMessage(data) : null;

  // Construir el mensaje final: usar el de Django si existe,
  // si no, usar el mapa de mensajes conocidos, y solo como
  // último recurso mostrar el código HTTP.
  let detail: string;

  if (djangoMessage) {
    detail = djangoMessage;
  } else if (HTTP_MESSAGES[status]) {
    detail = HTTP_MESSAGES[status];
  } else {
    detail = `Error inesperado (código ${status}).`;
  }

  // Extraer errores por campo si es un 400
  const fieldErrors =
    status === 400 && data
      ? extractFieldErrors(data)
      : undefined;

  return new ApiException(status, detail, fieldErrors);
}
