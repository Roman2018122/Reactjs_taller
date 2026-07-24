import type {
  Vehiculo,
} from "@/domain/entities/vehiculo.entity";

import type {
  VehiculoRepository,
} from "@/domain/repositories/vehiculo.repository";

export class GetVehiculoByIdUseCase {
  private readonly repository: VehiculoRepository;

  constructor(repository: VehiculoRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<Vehiculo> {
    return this.repository.getById(id);
  }
}