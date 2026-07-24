import type {
  Vehiculo,
  VehiculoCreateData,
  VehiculoFilters,
  VehiculosPaginatedResponse,
  VehiculoUpdateData,
} from "@/domain/entities/vehiculo.entity";

import type {
  VehiculoRepository,
} from "@/domain/repositories/vehiculo.repository";

import {
  apiClient,
} from "@/infrastructure/http/axios-client";

export class AxiosVehiculoRepository
  implements VehiculoRepository {
  async getAll(): Promise<Vehiculo[]> {
    const response =
      await apiClient.get<VehiculosPaginatedResponse>(
        "/vehiculos/",
      );

    return response.data.results;
  }

  async getPaginated(
    filters?: VehiculoFilters,
  ): Promise<VehiculosPaginatedResponse> {
    const response =
      await apiClient.get<VehiculosPaginatedResponse>(
        "/vehiculos/",
        {
          params: filters,
        },
      );

    return response.data;
  }

  async getById(
    id: number,
  ): Promise<Vehiculo> {
    const response =
      await apiClient.get<Vehiculo>(
        `/vehiculos/${id}/`,
      );

    return response.data;
  }

  async create(
    data: VehiculoCreateData,
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
    data: VehiculoUpdateData,
  ): Promise<Vehiculo> {
    const response =
      await apiClient.patch<Vehiculo>(
        `/vehiculos/${id}/`,
        data,
      );

    return response.data;
  }

  async remove(
    id: number,
  ): Promise<void> {
    await apiClient.delete(
      `/vehiculos/${id}/`,
    );
  }
}