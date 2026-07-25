// src/infrastructure/adapters/axios-modelo-vehiculo.repository.ts

import { apiClient } from "@/infrastructure/http/axios-client";

import type {
  ModeloVehiculo,
  ModeloVehiculoFormData,
  ModeloVehiculoPaginatedResponse,
  ModeloVehiculoUpdateData,
} from "@/domain/entities/modelo-vehiculo.entity";
import type { ModeloVehiculoRepository } from "@/domain/repositories/modelo-vehiculo.repository";

export class AxiosModeloVehiculoRepository
  implements ModeloVehiculoRepository
{
  async getAll(): Promise<ModeloVehiculo[]> {
    const response =
      await apiClient.get<
        ModeloVehiculo[] | ModeloVehiculoPaginatedResponse
      >("/modelos-vehiculo/");

    if (Array.isArray(response.data)) {
      return response.data;
    }

    return response.data.results;
  }

  async getPaginated(
    filters?: Record<string, unknown>,
  ): Promise<ModeloVehiculoPaginatedResponse> {
    const response =
      await apiClient.get<ModeloVehiculoPaginatedResponse>(
        "/modelos-vehiculo/",
        {
          params: filters,
        },
      );

    return response.data;
  }

  async getById(
    id: number,
  ): Promise<ModeloVehiculo> {
    const response =
      await apiClient.get<ModeloVehiculo>(
        `/modelos-vehiculo/${id}/`,
      );

    return response.data;
  }

  async create(
    data: ModeloVehiculoFormData,
  ): Promise<ModeloVehiculo> {
    const response =
      await apiClient.post<ModeloVehiculo>(
        "/modelos-vehiculo/",
        data,
      );

    return response.data;
  }

  async update(
    id: number,
    data: ModeloVehiculoUpdateData,
  ): Promise<ModeloVehiculo> {
    const response =
      await apiClient.patch<ModeloVehiculo>(
        `/modelos-vehiculo/${id}/`,
        data,
      );

    return response.data;
  }

  async remove(
    id: number,
  ): Promise<void> {
    await apiClient.delete(
      `/modelos-vehiculo/${id}/`,
    );
  }
}