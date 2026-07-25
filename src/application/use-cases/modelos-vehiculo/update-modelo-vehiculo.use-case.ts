import type {
  ModeloVehiculo,
  ModeloVehiculoUpdateData,
} from "@/domain/entities/modelo-vehiculo.entity";
import type { ModeloVehiculoRepository } from "@/domain/repositories/modelo-vehiculo.repository";

export class UpdateModeloVehiculoUseCase {
  private readonly repository: ModeloVehiculoRepository;

  constructor(repository: ModeloVehiculoRepository) {
    this.repository = repository;
  }

  execute(
    id: number,
    data: ModeloVehiculoUpdateData,
  ): Promise<ModeloVehiculo> {
    return this.repository.update(id, data);
  }
}
