import type {
  Cita,
  RegistrarAsistenciaData,
} from "@/domain/entities/cita.entity";

import type {
  CitaRepository,
} from "@/domain/ports/cita.repository";

export class RegistrarAsistenciaUseCase {
  private readonly repository: CitaRepository;

  constructor(
    repository: CitaRepository,
  ) {
    this.repository = repository;
  }

  execute(
    id: number,
    data: RegistrarAsistenciaData,
  ): Promise<Cita> {
    return this.repository.registrarAsistencia(
      id,
      data,
    );
  }
}