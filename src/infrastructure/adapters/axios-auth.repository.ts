// src/infrastructure/adapters/axios-auth.repository.ts

import { apiClient } from "@/infrastructure/http/axios-client";
import { parseApiError } from "@/infrastructure/http/parse-api-error";
import { localTokenStorage } from "@/infrastructure/storage/local-token-storage";

import type {
  AuthRepository,
  AuthSession,
} from "@/domain/ports/auth.repository";

import type { LoggedUser } from "@/domain/entities/logged-user.entity";
import type { AuthTokens } from "@/domain/entities/auth-tokens.entity";
import type { RegisterClientData } from "@/domain/models/register-client-data";

/**
 * Respuesta de los endpoints que entregan tokens JWT.
 */
interface RawTokenResponse {
  access: string;
  refresh: string;
}

export class AxiosAuthRepository implements AuthRepository {
  /**
   * POST /token/
   *
   * Obtiene los tokens, los guarda localmente y después consulta /me/
   * para obtener los datos del usuario autenticado.
   */
  async login(
    username: string,
    password: string,
  ): Promise<AuthSession> {
    try {
      const { data: tokens } =
        await apiClient.post<RawTokenResponse>("/token/", {
          username,
          password,
        });

      localTokenStorage.setTokens(
        tokens.access,
        tokens.refresh,
      );

      try {
        const user = await this.getCurrentUser();

        return {
          user,
          tokens,
        };
      } catch (error) {
        /*
         * Si se obtuvieron tokens, pero no fue posible obtener el usuario,
         * evitamos dejar una sesión incompleta almacenada.
         */
        localTokenStorage.clearTokens();
        throw error;
      }
    } catch (error) {
      throw parseApiError(error);
    }
  }

  /**
   * POST /auth/registro-cliente/
   *
   * Registra un cliente y guarda los tokens entregados por el backend.
   * Después consulta /me/ para construir la sesión completa.
   */
  async register(
    data: RegisterClientData,
        ): Promise<AuthSession> {
    try {
        await apiClient.post(
        "/registro/",
        data,
        );

        /*
        * El endpoint de registro no devuelve tokens.
        * Después de crear el usuario, iniciamos sesión automáticamente.
        */
        return await this.login(
        data.username,
        data.password,
        );
    } catch (error) {
        throw parseApiError(error);
    }
    }

    /**
     * Tu backend no tiene actualmente un endpoint de logout.
     *
     * Por eso el cierre de sesión consiste en eliminar los tokens locales.
     */
    async logout(): Promise<void> {
        localTokenStorage.clearTokens();
  }

  /**
   * GET /me/
   *
   * Obtiene la identidad universal del usuario autenticado.
   */
  async getCurrentUser(): Promise<LoggedUser> {
    try {
      const { data } =
        await apiClient.get<LoggedUser>("/me/");

      return data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  /**
   * Lee los tokens almacenados sin llamar al backend.
   */
  getStoredTokens(): AuthTokens | null {
    return localTokenStorage.getTokens();
  }

  /**
   * Elimina los tokens almacenados sin llamar al backend.
   */
  clearLocalSession(): void {
    localTokenStorage.clearTokens();
  }
}