import type {
  OrdenTrabajo,
  UpdateOrdenTrabajoEstadoData,
} from "@/domain/entities/orden-trabajo.entity";

import type {
  OrdenTrabajoRepository,
} from "@/domain/ports/orden-trabajo.repository";

export class UpdateOrdenTrabajoEstadoUseCase {
  private readonly repository:
    OrdenTrabajoRepository;

  constructor(
    repository: OrdenTrabajoRepository,
  ) {
    this.repository = repository;
  }

  async execute(
    id: number,
    data: UpdateOrdenTrabajoEstadoData,
  ): Promise<OrdenTrabajo> {
    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      throw new Error(
        "El identificador de la orden no es válido.",
      );
    }

    return this.repository.updateEstado(
      id,
      data,
    );
  }
}