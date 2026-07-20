import type { Cita } from "@/domain/entities/cita.entity";
import type { CitaRepository } from "@/domain/ports/cita.repository";

export class CancelCitaUseCase {
  private readonly repository: CitaRepository;

  constructor(repository: CitaRepository) {
    this.repository = repository;
  }

  execute(
    id: number,
    motivoCancelacion: string,
  ): Promise<Cita> {
    return this.repository.cancelar(
      id,
      motivoCancelacion,
    );
  }
}