// src/presentation/store/auth.store.ts

import { create } from "zustand";

import { authUseCase } from "@/infrastructure/factories/auth.factory";
import { AUTH_EXPIRED_EVENT } from "@/infrastructure/http/axios-client";

import type { LoginDto } from "@/application/dtos/login.dto";
import type { RegisterDto } from "@/application/dtos/register.dto";
import type { LoggedUser } from "@/domain/entities/logged-user.entity";
import type { AuthTokens } from "@/domain/entities/auth-tokens.entity";

// ─── Tipos del store ──────────────────────────────────────────────────────────

interface AuthState {
  /**
   * Usuario autenticado.
   */
  user: LoggedUser | null;

  /**
   * Tokens JWT actuales.
   */
  tokens: AuthTokens | null;

  /**
   * Indica si hay una operación de autenticación en curso.
   */
  isLoading: boolean;

  /**
   * Indica si ya terminó la restauración inicial de la sesión.
   */
  isInitialized: boolean;

  /**
   * Mensaje del último error de autenticación.
   */
  error: string | null;
}

interface AuthActions {
  /**
   * Inicia sesión.
   */
  login(dto: LoginDto): Promise<void>;

  /**
   * Registra un cliente y luego inicia sesión automáticamente.
   */
  register(dto: RegisterDto): Promise<void>;

  /**
   * Cierra la sesión y elimina los tokens locales.
   */
  logout(): Promise<void>;

  /**
   * Intenta restaurar una sesión previamente almacenada.
   */
  loadSession(): Promise<void>;

  /**
   * Limpia el mensaje de error.
   */
  clearError(): void;

  /**
   * Limpia la sesión sin ejecutar el flujo normal de logout.
   *
   * Se usa cuando Axios detecta que el refresh token expiró
   * o ya no es válido.
   */
  clearSession(): void;
}

export type AuthStore = AuthState & AuthActions;

// ─── Utilidades ───────────────────────────────────────────────────────────────

function getErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (
    typeof error === "object" &&
    error !== null
  ) {
    const possibleError = error as {
      detail?: unknown;
      message?: unknown;
    };

    if (typeof possibleError.detail === "string") {
      return possibleError.detail;
    }

    if (typeof possibleError.message === "string") {
      return possibleError.message;
    }
  }

  return fallback;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  tokens: null,
  isLoading: false,
  isInitialized: false,
  error: null,

  async login(dto) {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const session = await authUseCase.login(dto);

      set({
        user: session.user,
        tokens: session.tokens,
        isLoading: false,
        isInitialized: true,
        error: null,
      });
    } catch (error: unknown) {
      set({
        user: null,
        tokens: null,
        isLoading: false,
        isInitialized: true,
        error: getErrorMessage(
          error,
          "Error al iniciar sesión.",
        ),
      });

    throw error;
  }
},

async register(dto) {
  set({
    isLoading: true,
    error: null,
  });

  try {
    const session = await authUseCase.register(dto);

    set({
      user: session.user,
      tokens: session.tokens,
      isLoading: false,
      isInitialized: true,
      error: null,
    });
  } catch (error: unknown) {
    set({
      user: null,
      tokens: null,
      isLoading: false,
      isInitialized: true,
      error: getErrorMessage(
        error,
        "Error al registrar el cliente.",
      ),
    });

    throw error;
  }
},

  async logout() {
    set({
      isLoading: true,
      error: null,
    });

    try {
      await authUseCase.logout();
    } finally {
      set({
        user: null,
        tokens: null,
        isLoading: false,
        isInitialized: true,
        error: null,
      });
    }
  },

async loadSession() {
  set({
    isLoading: true,
    error: null,
  });

  try {
    const session =
      await authUseCase.restoreSession();

    if (!session) {
      set({
        user: null,
        tokens: null,
        isLoading: false,
        isInitialized: true,
        error: null,
      });

      return;
    }

    set({
      user: session.user,
      tokens: session.tokens,
      isLoading: false,
      isInitialized: true,
      error: null,
    });
  } catch (error: unknown) {
    set({
      user: null,
      tokens: null,
      isLoading: false,
      isInitialized: true,
      error: getErrorMessage(
        error,
        "No se pudo restaurar la sesión.",
      ),
    });
  }
},
  clearError() {
    set({
      error: null,
    });
  },

  clearSession() {
    authUseCase.clearLocalSession();

    set({
      user: null,
      tokens: null,
      isLoading: false,
      isInitialized: true,
      error: null,
    });
  },
}));

// ─── Evento de sesión expirada ────────────────────────────────────────────────

if (typeof window !== "undefined") {
  window.addEventListener(AUTH_EXPIRED_EVENT, () => {
    useAuthStore.getState().clearSession();
  });
}

// ─── Selectores ───────────────────────────────────────────────────────────────

export const selectIsAuthenticated = (
  state: AuthStore,
): boolean => state.user !== null;

export const selectIsAdmin = (
  state: AuthStore,
): boolean => state.user?.rol === "ADMIN";

export const selectIsEmpleado = (
  state: AuthStore,
): boolean => state.user?.rol === "EMPLEADO";

export const selectIsCliente = (
  state: AuthStore,
): boolean => state.user?.rol === "CLIENTE";

export const selectCanManageWorkshop = (
  state: AuthStore,
): boolean =>
  state.user?.rol === "ADMIN" ||
  state.user?.rol === "EMPLEADO";