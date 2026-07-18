// src/domain/entities/cliente-profile.entity.ts

import type { LoggedUser } from "./logged-user.entity";

/**
 * Perfil del cliente autenticado.
 */
export interface ClienteProfile {
  id: number
  usuario: LoggedUser
  identificacion: string
  telefono: string
  direccion: string
  activo: boolean
  creado_en: string
  actualizado_en: string
}