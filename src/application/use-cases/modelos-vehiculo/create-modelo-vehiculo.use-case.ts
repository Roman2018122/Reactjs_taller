import type {
  ModeloVehiculo,
  ModeloVehiculoFormData,
} from "@/domain/entities/modelo-vehiculo.entity";
import type { ModeloVehiculoRepository } from "@/domain/repositories/modelo-vehiculo.repository";

export class CreateModeloVehiculoUseCase {
  private readonly repository: ModeloVehiculoRepository;

  constructor(repository: ModeloVehiculoRepository) {
    this.repository = repository;
  }

  execute(
    data: ModeloVehiculoFormData,
  ): Promise<ModeloVehiculo> {
    return this.repository.create(data);
  }
}
