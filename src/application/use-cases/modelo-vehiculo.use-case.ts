// src/application/use-cases/modelo-vehiculo.use-case.ts

import type { ModeloVehiculo } from "@/domain/entities/modelo-vehiculo.entity";
import type { ModeloVehiculoRepository } from "@/domain/repositories/modelo-vehiculo.repository";

export class ModeloVehiculoUseCase {
  private readonly repository: ModeloVehiculoRepository;

  constructor(
    repository: ModeloVehiculoRepository,
  ) {
    this.repository = repository;
  }

  /**
   * Obtiene todos los modelos de vehículos.
   */
  async getAll(): Promise<ModeloVehiculo[]> {
    return this.repository.getAll();
  }

  /**
   * Obtiene un modelo de vehículo por su identificador.
   */
  async getById(
    id: number,
  ): Promise<ModeloVehiculo> {
    return this.repository.getById(id);
  }
}