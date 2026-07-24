import type {
  VehiculoRepository,
} from "@/domain/repositories/vehiculo.repository";

export class DeleteVehiculoUseCase {
  private readonly repository: VehiculoRepository;

  constructor(repository: VehiculoRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<void> {
    return this.repository.remove(id);
  }
}