import type {
  OrdenTrabajo,
} from "@/domain/entities/orden-trabajo.entity";

import type {
  OrdenTrabajoRepository,
} from "@/domain/ports/orden-trabajo.repository";

export class GetOrdenTrabajoByIdUseCase {
  private readonly repository: OrdenTrabajoRepository;

  constructor(repository: OrdenTrabajoRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<OrdenTrabajo> {
    return this.repository.getById(id);
  }
}