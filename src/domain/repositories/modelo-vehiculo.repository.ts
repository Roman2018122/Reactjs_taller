// src/domain/repositories/modelo-vehiculo.repository.ts

import type {
  ModeloVehiculo,
  ModeloVehiculoFormData,
  ModeloVehiculoPaginatedResponse,
  ModeloVehiculoUpdateData,
} from "@/domain/entities/modelo-vehiculo.entity";

export interface ModeloVehiculoRepository {
  getAll(): Promise<ModeloVehiculo[]>;

  getPaginated(
    filters?: Record<string, unknown>,
  ): Promise<ModeloVehiculoPaginatedResponse>;

  getById(
    id: number,
  ): Promise<ModeloVehiculo>;

  create(
    data: ModeloVehiculoFormData,
  ): Promise<ModeloVehiculo>;

  update(
    id: number,
    data: ModeloVehiculoUpdateData,
  ): Promise<ModeloVehiculo>;

  remove(
    id: number,
  ): Promise<void>;
}