// src/infrastructure/adapters/axios-vehiculo.repository.ts

import type {
  Vehiculo,
  VehiculoFormData,
} from "@/domain/entities/vehiculo.entity";

import type { VehiculoRepository } from "@/domain/repositories/vehiculo.repository";

import { apiClient } from "@/infrastructure/http/axios-client";

interface VehiculoPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Vehiculo[];
}

export class AxiosVehiculoRepository
  implements VehiculoRepository
{
  async getAll(): Promise<Vehiculo[]> {
    const response =
      await apiClient.get<VehiculoPaginatedResponse>(
        "/vehiculos/",
      );

    return response.data.results;
  }

  async getById(id: number): Promise<Vehiculo> {
    const response =
      await apiClient.get<Vehiculo>(
        `/vehiculos/${id}/`,
      );

    return response.data;
  }

  async create(
    data: VehiculoFormData,
  ): Promise<Vehiculo> {
    const response =
      await apiClient.post<Vehiculo>(
        "/vehiculos/",
        data,
      );

    return response.data;
  }

  async update(
    id: number,
    data: VehiculoFormData,
  ): Promise<Vehiculo> {
    const response =
      await apiClient.put<Vehiculo>(
        `/vehiculos/${id}/`,
        data,
      );

    return response.data;
  }

  async remove(id: number): Promise<void> {
    await apiClient.delete(
      `/vehiculos/${id}/`,
    );
  }
}