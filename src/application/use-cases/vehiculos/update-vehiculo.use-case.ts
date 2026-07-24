import type {
  Vehiculo,
  VehiculoUpdateData,
} from "@/domain/entities/vehiculo.entity";

import type {
  VehiculoRepository,
} from "@/domain/repositories/vehiculo.repository";

export class UpdateVehiculoUseCase {
  private readonly repository: VehiculoRepository;

  constructor(repository: VehiculoRepository) {
    this.repository = repository;
  }

  execute(
    id: number,
    data: VehiculoUpdateData,
  ): Promise<Vehiculo> {
    return this.repository.update(id, data);
  }
}