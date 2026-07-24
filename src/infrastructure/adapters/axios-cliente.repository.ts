import { apiClient } from "@/infrastructure/http/axios-client";

import type {
  Cliente,
  ClienteFilters,
  ClienteFormData,
  ClientesPaginatedResponse,
  ClienteUpdateData,
} from "@/domain/entities/cliente.entity";

import type {
  ClienteRepository,
} from "@/domain/ports/cliente.repository";

export class AxiosClienteRepository
  implements ClienteRepository {

  async getAll(
    filters?: ClienteFilters,
  ): Promise<ClientesPaginatedResponse> {

    const response = await apiClient.get<ClientesPaginatedResponse>(
      "/clientes/",
      {
        params: filters,
      },
    );

    return response.data;
  }

  async getById(
    id: number,
  ): Promise<Cliente> {

    const response = await apiClient.get<Cliente>(
      `/clientes/${id}/`,
    );

    return response.data;
  }

  async create(
    data: ClienteFormData,
  ): Promise<Cliente> {

    const response = await apiClient.post<Cliente>(
      "/clientes/",
      data,
    );

    return response.data;
  }

  async update(
    id: number,
    data: ClienteUpdateData,
  ): Promise<Cliente> {

    const response = await apiClient.patch<Cliente>(
      `/clientes/${id}/`,
      data,
    );

    return response.data;
  }

  async delete(
    id: number,
  ): Promise<void> {

    await apiClient.delete(
      `/clientes/${id}/`,
    );
  }
}