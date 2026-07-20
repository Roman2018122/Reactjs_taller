// src/infrastructure/adapters/axios-cita.repository.ts

import type {
  Cita,
  CitaFormData,
  ResponderCitaData,
  RegistrarAsistenciaData,

} from "@/domain/entities/cita.entity";
import type { PaginatedResponse } from "@/domain/entities/paginated-response.entity";
import type { CitaRepository } from "@/domain/ports/cita.repository";

import { apiClient } from "@/infrastructure/http/axios-client";
import { parseApiError } from "@/infrastructure/http/parse-api-error";

export class AxiosCitaRepository
  implements CitaRepository
{
  async getAll(): Promise<Cita[]> {
    const response =
      await apiClient.get<PaginatedResponse<Cita>>(
        "/citas/",
      );

    return response.data.results;
  }

  async getById(id: number): Promise<Cita> {
    const response = await apiClient.get<Cita>(
      `/citas/${id}/`,
    );

    return response.data;
  }

  async create(
    data: CitaFormData,
  ): Promise<Cita> {
    const response = await apiClient.post<Cita>(
      "/citas/",
      data,
    );

    return response.data;
  }

  async update(
    id: number,
    data: CitaFormData,
  ): Promise<Cita> {
    const response = await apiClient.patch<Cita>(
      `/citas/${id}/`,
      data,
    );

    return response.data;
  }

  async remove(id: number): Promise<void> {
    await apiClient.delete(`/citas/${id}/`);
  }

  async cancelar(
    id: number,
    motivoCancelacion: string,
  ): Promise<Cita> {
    const { data } = await apiClient.post<Cita>(
      `/citas/${id}/cancelar/`,
      {
        motivo_cancelacion: motivoCancelacion,
      },
    );

    return data;
  }
  async responder(
    id: number,
    data: ResponderCitaData,
  ): Promise<Cita> {
    try {
      const response =
        await apiClient.post<Cita>(
          `/citas/${id}/responder/`,
          data,
        );

      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }
  async registrarAsistencia(
    id: number,
    data: RegistrarAsistenciaData,
  ): Promise<Cita> {
    try {
      const response =
        await apiClient.post<Cita>(
          `/citas/${id}/registrar-asistencia/`,
          data,
        );

      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }
}