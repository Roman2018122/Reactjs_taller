// src/application/use-cases/citas/get-cita-by-id.use-case.ts

import type { Cita } from "@/domain/entities/cita.entity";
import type { CitaRepository } from "@/domain/ports/cita.repository";

export class GetCitaByIdUseCase {
  private readonly repository: CitaRepository;

  constructor(repository: CitaRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<Cita> {
    if (!Number.isInteger(id) || id <= 0) {
      return Promise.reject(
        new Error("El identificador de la cita no es válido."),
      );
    }

    return this.repository.getById(id);
  }
}