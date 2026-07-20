// src/domain/repositories/vehiculo.repository.ts

import type {
  Vehiculo,
  VehiculoFormData,
} from "../entities/vehiculo.entity";

export interface VehiculoRepository {
  getAll(): Promise<Vehiculo[]>;

  getById(id: number): Promise<Vehiculo>;

  create(data: VehiculoFormData): Promise<Vehiculo>;

  update(
    id: number,
    data: VehiculoFormData,
  ): Promise<Vehiculo>;

  remove(id: number): Promise<void>;
}