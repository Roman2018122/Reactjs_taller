import type {
  Vehiculo,
} from "@/domain/entities/vehiculo.entity";

import type {
  VehiculoRepository,
} from "@/domain/repositories/vehiculo.repository";

export class GetVehiculosUseCase {
  private readonly repository: VehiculoRepository;

  constructor(repository: VehiculoRepository) {
    this.repository = repository;
  }

  execute(): Promise<Vehiculo[]> {
    return this.repository.getAll();
  }
}