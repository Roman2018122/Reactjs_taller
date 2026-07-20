// src/application/use-cases/citas/delete-cita.use-case.ts

import type { CitaRepository } from "@/domain/ports/cita.repository";

export class DeleteCitaUseCase {
  private readonly repository: CitaRepository;

  constructor(repository: CitaRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
      return Promise.reject(
        new Error("El identificador de la cita no es válido."),
      );
    }

    return this.repository.remove(id);
  }
}