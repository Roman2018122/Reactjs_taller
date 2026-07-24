import type {
  Cliente,
  ClienteFilters,
  ClienteFormData,
  ClientesPaginatedResponse,
  ClienteUpdateData,
} from "@/domain/entities/cliente.entity";

export interface ClienteRepository {
  getAll(
    filters?: ClienteFilters,
  ): Promise<ClientesPaginatedResponse>;

  getById(id: number): Promise<Cliente>;

  create(data: ClienteFormData): Promise<Cliente>;

  update(
    id: number,
    data: ClienteUpdateData,
  ): Promise<Cliente>;

  delete(id: number): Promise<void>;
}