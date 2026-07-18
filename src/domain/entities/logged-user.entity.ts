// src/domain/entities/logged-user.entity.ts

/**
 * Roles permitidos por el sistema.
 */
export type UserRole = "CLIENTE" | "EMPLEADO" | "ADMIN";

/**
 * Información del usuario autenticado.
 */
export interface LoggedUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  nombre_completo: string;
  rol: UserRole;
}