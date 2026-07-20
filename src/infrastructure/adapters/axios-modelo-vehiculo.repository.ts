// src/infrastructure/adapters/axios-modelo-vehiculo.repository.ts

import { apiClient } from "@/infrastructure/http/axios-client";

import type { ModeloVehiculo } from "@/domain/entities/modelo-vehiculo.entity";
import type { ModeloVehiculoRepository } from "@/domain/repositories/modelo-vehiculo.repository";

/**
 * Respuesta paginada de Django REST Framework.
 */
interface ModeloVehiculoPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ModeloVehiculo[];
}

export class AxiosModeloVehiculoRepository
  implements ModeloVehiculoRepository
{
  /**
   * Obtiene todos los modelos de vehículos.
   */
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

  /**
   * Obtiene un modelo de vehículo por su identificador.
   */
  async getById(
    id: number,
  ): Promise<ModeloVehiculo> {
    const response =
      await apiClient.get<ModeloVehiculo>(
        `/modelos-vehiculo/${id}/`,
      );

    return response.data;
  }
}