// src/application/use-cases/auth.use-case.ts

import type {
  AuthRepository,
  AuthSession,
} from "@/domain/ports/auth.repository";

import type { LoginDto } from "../dtos/login.dto";
import type { RegisterDto } from "../dtos/register.dto";

export class AuthUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }
  /**
   * Inicia sesión con las credenciales ingresadas.
   */
  login(dto: LoginDto): Promise<AuthSession> {
    return this.authRepository.login(dto.username, dto.password);
  }

  /**
   * Registra un nuevo cliente.
   *
   * El DTO completo se envía al repositorio porque contiene
   * todos los campos requeridos por el backend.
   */
  register(dto: RegisterDto): Promise<AuthSession> {
    return this.authRepository.register(dto);
  }

  /**
   * Cierra la sesión.
   */
  logout(): Promise<void> {
    return this.authRepository.logout();
  }

  /**
   * Intenta restaurar la sesión mediante los tokens almacenados.
   *
   * Si no hay tokens, devuelve null.
   * Si el servidor rechaza la sesión, elimina los datos locales.
   */
  async restoreSession(): Promise<AuthSession | null> {
    const tokens = this.authRepository.getStoredTokens();

    if (!tokens) {
      return null;
    }

    try {
      const user = await this.authRepository.getCurrentUser();

      /*
       * Se vuelven a leer los tokens por si Axios renovó el access token
       * durante la petición a /me/.
       */
      const currentTokens =
        this.authRepository.getStoredTokens() ?? tokens;

      return {
        user,
        tokens: currentTokens,
      };
    } catch {
      this.authRepository.clearLocalSession();

      return null;
    }
  }

  /**
   * Limpia la sesión local sin realizar una petición al backend.
   */
  clearLocalSession(): void {
    this.authRepository.clearLocalSession();
  }
}