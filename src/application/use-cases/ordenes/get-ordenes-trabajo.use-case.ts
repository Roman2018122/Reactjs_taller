import type {
  OrdenTrabajoFilters,
  OrdenTrabajoPaginatedResponse,
} from "@/domain/entities/orden-trabajo.entity";

import type {
  OrdenTrabajoRepository,
} from "@/domain/ports/orden-trabajo.repository";

export class GetOrdenesTrabajoUseCase {
  private readonly repository: OrdenTrabajoRepository;

  constructor(repository: OrdenTrabajoRepository) {
    this.repository = repository;
  }

  execute(
    filters?: OrdenTrabajoFilters,
  ): Promise<OrdenTrabajoPaginatedResponse> {
    return this.repository.getAll(filters);
  }
}