// src/application/use-cases/citas/get-citas.use-case.ts

import type { Cita } from "@/domain/entities/cita.entity";
import type { CitaRepository } from "@/domain/ports/cita.repository";

export class GetCitasUseCase {
  private readonly repository: CitaRepository;

  constructor(repository: CitaRepository) {
    this.repository = repository;
  }

  execute(): Promise<Cita[]> {
    return this.repository.getAll();
  }
}