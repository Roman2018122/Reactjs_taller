// src/infrastructure/adapters/axios-servicio.repository.ts

import type { PaginatedResponse } from "@/domain/entities/paginated-response.entity";
import type { Servicio } from "@/domain/entities/servicio.entity";
import type { ServicioRepository } from "@/domain/ports/servicio.repository";

import { apiClient } from "@/infrastructure/http/axios-client";

export class AxiosServicioRepository
  implements ServicioRepository
{
  async getAll(): Promise<Servicio[]> {
    const response =
      await apiClient.get<
        PaginatedResponse<Servicio>
      >("/servicios/");

    return response.data.results;
  }
}