// src/application/use-cases/servicios/get-servicios.use-case.ts

import type { Servicio } from "@/domain/entities/servicio.entity";
import type { ServicioRepository } from "@/domain/ports/servicio.repository";

export class GetServiciosUseCase {
  private readonly repository: ServicioRepository;

  constructor(repository: ServicioRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Servicio[]> {
    return this.repository.getAll();
  }
}