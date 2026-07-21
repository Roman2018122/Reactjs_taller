import type {
  OrdenTrabajo,
  OrdenTrabajoFilters,
  OrdenTrabajoPaginatedResponse,
  UpdateOrdenTrabajoEstadoData,

} from "@/domain/entities/orden-trabajo.entity";

import type {
  OrdenTrabajoRepository,
} from "@/domain/ports/orden-trabajo.repository";

import { apiClient } from "@/infrastructure/http/axios-client";
import { parseApiError } from "@/infrastructure/http/parse-api-error";

export class AxiosOrdenTrabajoRepository
  implements OrdenTrabajoRepository
{
  async getAll(
    filters?: OrdenTrabajoFilters,
  ): Promise<OrdenTrabajoPaginatedResponse> {
    try {
      const response =
        await apiClient.get<OrdenTrabajoPaginatedResponse>(
          "/ordenes-trabajo/",
          {
            params: {
              page: filters?.page,
              search: filters?.search || undefined,
              estado: filters?.estado || undefined,
            },
          },
        );

      return response.data;
    } catch (error: unknown) {
      throw parseApiError(error);
    }
  }

  async getById(id: number): Promise<OrdenTrabajo> {
    try {
      const response = await apiClient.get<OrdenTrabajo>(
        `/ordenes-trabajo/${id}/`,
      );

      return response.data;
    } catch (error: unknown) {
      throw parseApiError(error);
    }
  }
  async updateEstado(
    id: number,
    data: UpdateOrdenTrabajoEstadoData,
  ): Promise<OrdenTrabajo> {
    try {
      const response =
        await apiClient.patch<OrdenTrabajo>(
          `/ordenes-trabajo/${id}/`,
          data,
        );

      return response.data;
    } catch (error: unknown) {
      throw parseApiError(error);
    }
  }
}