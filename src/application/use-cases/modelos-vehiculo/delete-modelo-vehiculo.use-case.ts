import type { ModeloVehiculoRepository } from "@/domain/repositories/modelo-vehiculo.repository";

export class DeleteModeloVehiculoUseCase {
  private readonly repository: ModeloVehiculoRepository;

  constructor(repository: ModeloVehiculoRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<void> {
    return this.repository.remove(id);
  }
}
