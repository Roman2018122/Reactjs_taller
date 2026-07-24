import type {
  Vehiculo,
  VehiculoCreateData,
} from "@/domain/entities/vehiculo.entity";

import type {
  VehiculoRepository,
} from "@/domain/repositories/vehiculo.repository";

export class CreateVehiculoUseCase {
  private readonly repository: VehiculoRepository;

  constructor(repository: VehiculoRepository) {
    this.repository = repository;
  }

  execute(
    data: VehiculoCreateData,
  ): Promise<Vehiculo> {
    return this.repository.create(data);
  }
}