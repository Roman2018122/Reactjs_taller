// src/application/use-cases/citas/responder-cita.use-case.ts

import type {
  Cita,
  ResponderCitaData,
} from "@/domain/entities/cita.entity";

import type {
  CitaRepository,
} from "@/domain/ports/cita.repository";

export class ResponderCitaUseCase {
  private readonly repository: CitaRepository;

  constructor(repository: CitaRepository) {
    this.repository = repository;
  }

  execute(
    id: number,
    data: ResponderCitaData,
  ): Promise<Cita> {
    return this.repository.responder(
      id,
      data,
    );
  }
}