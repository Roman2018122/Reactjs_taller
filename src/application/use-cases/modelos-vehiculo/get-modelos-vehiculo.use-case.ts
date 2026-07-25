import type { ModeloVehiculo } from "@/domain/entities/modelo-vehiculo.entity";
import type { ModeloVehiculoRepository } from "@/domain/repositories/modelo-vehiculo.repository";

export class GetModelosVehiculoUseCase {
  private readonly repository: ModeloVehiculoRepository;

  constructor(repository: ModeloVehiculoRepository) {
    this.repository = repository;
  }

  execute(): Promise<ModeloVehiculo[]> {
    return this.repository.getAll();
  }
}
