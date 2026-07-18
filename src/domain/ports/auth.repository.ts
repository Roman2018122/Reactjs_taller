// src/domain/ports/auth.repository.ts

import type { LoggedUser } from "../entities/logged-user.entity";
import type { AuthTokens } from "../entities/auth-tokens.entity";
import type { RegisterClientData } from "../models/register-client-data";
/**
 * Resultado de un login o registro exitoso.
 */
export interface AuthSession {
  user: LoggedUser;
  tokens: AuthTokens;
}

/**
 * Contrato de acceso a datos de autenticación.
 *
 * La capa de dominio no conoce Axios, endpoints ni localStorage.
 */
export interface AuthRepository {
  login(username: string, password: string): Promise<AuthSession>;

  register(data: RegisterClientData): Promise<AuthSession>;

  logout(): Promise<void>;

  getCurrentUser(): Promise<LoggedUser>;

  getStoredTokens(): AuthTokens | null;

  clearLocalSession(): void;
}