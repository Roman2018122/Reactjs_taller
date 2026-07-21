import type {
  CrearOrdenDesdeCitaData,
} from "@/domain/entities/cita.entity";

import type {
  OrdenTrabajo,
} from "@/domain/entities/orden-trabajo.entity";

import type {
  CitaRepository,
} from "@/domain/ports/cita.repository";

export class CrearOrdenDesdeCitaUseCase {
  private readonly repository:
    CitaRepository;

  constructor(
    repository: CitaRepository,
  ) {
    this.repository = repository;
  }

  execute(
    citaId: number,
    data: CrearOrdenDesdeCitaData,
  ): Promise<OrdenTrabajo> {
    return this.repository.crearOrden(
      citaId,
      data,
    );
  }
}