import type {
  VehiculoFilters,
  VehiculosPaginatedResponse,
} from "@/domain/entities/vehiculo.entity";

import type {
  VehiculoRepository,
} from "@/domain/repositories/vehiculo.repository";

export class GetVehiculosPaginatedUseCase {
  private readonly repository: VehiculoRepository;

  constructor(repository: VehiculoRepository) {
    this.repository = repository;
  }

  execute(
    filters?: VehiculoFilters,
  ): Promise<VehiculosPaginatedResponse> {
    return this.repository.getPaginated(filters);
  }
}