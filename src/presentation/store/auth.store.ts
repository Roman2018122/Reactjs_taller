// src/presentation/store/auth.store.ts

import { create } from "zustand";

import { authUseCase } from "@/infrastructure/factories/auth.factory";
import { AUTH_EXPIRED_EVENT } from "@/infrastructure/http/axios-client";
import { ApiException } from "@/domain/exceptions/api.exception";

import type { LoginDto } from "@/application/dtos/login.dto";
import type { RegisterDto } from "@/application/dtos/register.dto";
import type { LoggedUser } from "@/domain/entities/logged-user.entity";
import type { AuthTokens } from "@/domain/entities/auth-tokens.entity";

// ─── Tipos del store ──────────────────────────────────────────────────────────

interface AuthState {
  user: LoggedUser | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  fieldErrors: Record<string, string[]> | null;
}

interface AuthActions {
  login(dto: LoginDto): Promise<void>;
  register(dto: RegisterDto): Promise<void>;
  logout(): Promise<void>;
  loadSession(): Promise<void>;
  clearError(): void;
  clearFieldErrors(): void;
  clearSession(): void;
}

export type AuthStore = AuthState & AuthActions;

// ─── Utilidades ───────────────────────────────────────────────────────────────

function extractErrorInfo(error: unknown): {
  message: string;
  fieldErrors: Record<string, string[]> | null;
} {
  if (error instanceof ApiException) {
    return {
      message: error.detail,
      fieldErrors: error.fieldErrors ?? null,
    };
  }

  if (
    typeof error === "object" &&
    error !== null
  ) {
    const possibleError = error as {
      detail?: unknown;
      message?: unknown;
    };

    if (typeof possibleError.detail === "string") {
      return { message: possibleError.detail, fieldErrors: null };
    }

    if (typeof possibleError.message === "string") {
      return { message: possibleError.message, fieldErrors: null };
    }
  }

  return { message: "Ocurrió un error inesperado.", fieldErrors: null };
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  tokens: null,
  isLoading: false,
  isInitialized: false,
  error: null,
  fieldErrors: null,

  async login(dto) {
    set({ isLoading: true, error: null, fieldErrors: null });

    try {
      const session = await authUseCase.login(dto);

      set({
        user: session.user,
        tokens: session.tokens,
        isLoading: false,
        isInitialized: true,
        error: null,
        fieldErrors: null,
      });
    } catch (error: unknown) {
      const info = extractErrorInfo(error);

      set({
        user: null,
        tokens: null,
        isLoading: false,
        isInitialized: true,
        error: info.message,
        fieldErrors: info.fieldErrors,
      });

      throw error;
    }
  },

  async register(dto) {
    set({ isLoading: true, error: null, fieldErrors: null });

    try {
      const session = await authUseCase.register(dto);

      set({
        user: session.user,
        tokens: session.tokens,
        isLoading: false,
        isInitialized: true,
        error: null,
        fieldErrors: null,
      });
    } catch (error: unknown) {
      const info = extractErrorInfo(error);

      set({
        user: null,
        tokens: null,
        isLoading: false,
        isInitialized: true,
        error: info.message,
        fieldErrors: info.fieldErrors,
      });

      throw error;
    }
  },

  async logout() {
    set({ isLoading: true, error: null, fieldErrors: null });

    try {
      await authUseCase.logout();
    } finally {
      set({
        user: null,
        tokens: null,
        isLoading: false,
        isInitialized: true,
        error: null,
        fieldErrors: null,
      });
    }
  },

  async loadSession() {
    set({ isLoading: true, error: null, fieldErrors: null });

    try {
      const session = await authUseCase.restoreSession();

      if (!session) {
        set({
          user: null,
          tokens: null,
          isLoading: false,
          isInitialized: true,
          error: null,
          fieldErrors: null,
        });

        return;
      }

      set({
        user: session.user,
        tokens: session.tokens,
        isLoading: false,
        isInitialized: true,
        error: null,
        fieldErrors: null,
      });
    } catch (error: unknown) {
      const info = extractErrorInfo(error);

      set({
        user: null,
        tokens: null,
        isLoading: false,
        isInitialized: true,
        error: info.message,
        fieldErrors: null,
      });
    }
  },

  clearError() {
    set({ error: null, fieldErrors: null });
  },

  clearFieldErrors() {
    set({ fieldErrors: null });
  },

  clearSession() {
    authUseCase.clearLocalSession();

    set({
      user: null,
      tokens: null,
      isLoading: false,
      isInitialized: true,
      error: null,
      fieldErrors: null,
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