import type {
  Marca,
  MarcaFormData,
  MarcaFilters,
  MarcasPaginatedResponse,
  MarcaUpdateData,
} from "@/domain/entities/marca.entity";

import type {
  MarcaRepository,
} from "@/domain/ports/marca.repository";

import {
  apiClient,
} from "@/infrastructure/http/axios-client";

export class AxiosMarcaRepository
  implements MarcaRepository {
  async getAll(): Promise<Marca[]> {
    const response =
      await apiClient.get<Marca[] | MarcasPaginatedResponse>(
        "/marcas/",
      );

    if (Array.isArray(response.data)) {
      return response.data;
    }

    return response.data.results;
  }

  async getPaginated(
    filters?: MarcaFilters,
  ): Promise<MarcasPaginatedResponse> {
    const response =
      await apiClient.get<MarcasPaginatedResponse>(
        "/marcas/",
        {
          params: filters,
        },
      );

    return response.data;
  }

  async getById(
    id: number,
  ): Promise<Marca> {
    const response =
      await apiClient.get<Marca>(
        `/marcas/${id}/`,
      );

    return response.data;
  }

  async create(
    data: MarcaFormData,
  ): Promise<Marca> {
    const response =
      await apiClient.post<Marca>(
        "/marcas/",
        data,
      );

    return response.data;
  }

  async update(
    id: number,
    data: MarcaUpdateData,
  ): Promise<Marca> {
    const response =
      await apiClient.patch<Marca>(
        `/marcas/${id}/`,
        data,
      );

    return response.data;
  }

  async remove(
    id: number,
  ): Promise<void> {
    await apiClient.delete(
      `/marcas/${id}/`,
    );
  }
}
