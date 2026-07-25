import type { ModeloVehiculo } from "@/domain/entities/modelo-vehiculo.entity";
import type { ModeloVehiculoRepository } from "@/domain/repositories/modelo-vehiculo.repository";

export class GetModeloVehiculoByIdUseCase {
  private readonly repository: ModeloVehiculoRepository;

  constructor(repository: ModeloVehiculoRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<ModeloVehiculo> {
    return this.repository.getById(id);
  }
}
