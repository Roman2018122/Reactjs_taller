// src/domain/entities/auth-tokens.entity.ts

/**
 * Tokens JWT devueltos por el backend.
 */
export interface AuthTokens {
  access: string
  refresh: string
}