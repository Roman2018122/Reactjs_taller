// src/domain/ports/servicio.repository.ts

import type { Servicio } from "@/domain/entities/servicio.entity";

export interface ServicioRepository {
  getAll(): Promise<Servicio[]>;
}