// src/domain/repositories/modelo-vehiculo.repository.ts

import type { ModeloVehiculo } from "@/domain/entities/modelo-vehiculo.entity";

export interface ModeloVehiculoRepository {
  /**
   * Obtiene todos los modelos de vehículos.
   */
  getAll(): Promise<ModeloVehiculo[]>;

  /**
   * Obtiene un modelo de vehículo por su identificador.
   */
  getById(
    id: number,
  ): Promise<ModeloVehiculo>;
}