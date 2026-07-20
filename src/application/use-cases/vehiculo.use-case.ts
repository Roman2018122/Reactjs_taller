// src/application/use-cases/vehiculo.use-case.ts

import type {
  Vehiculo,
  VehiculoFormData,
} from "../../domain/entities/vehiculo.entity";

import type { VehiculoRepository } from "../../domain/repositories/vehiculo.repository";

export class VehiculoUseCase {
  private repository: VehiculoRepository;

  constructor(repository: VehiculoRepository) {
    this.repository = repository;
  }

  getAll(): Promise<Vehiculo[]> {
    return this.repository.getAll();
  }

  getById(id: number): Promise<Vehiculo> {
    return this.repository.getById(id);
  }

  create(data: VehiculoFormData): Promise<Vehiculo> {
    return this.repository.create(data);
  }

  update(
    id: number,
    data: VehiculoFormData,
  ): Promise<Vehiculo> {
    return this.repository.update(id, data);
  }

  remove(id: number): Promise<void> {
    return this.repository.remove(id);
  }
}