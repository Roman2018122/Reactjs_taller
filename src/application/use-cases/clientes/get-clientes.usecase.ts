import type {
  ClienteFilters,
  ClientesPaginatedResponse,
} from "@/domain/entities/cliente.entity";

import type {
  ClienteRepository,
} from "@/domain/ports/cliente.repository";

export class GetClientesUseCase {
  private readonly repository: ClienteRepository;

  constructor(repository: ClienteRepository) {
    this.repository = repository;
  }

  execute(
    filters?: ClienteFilters,
  ): Promise<ClientesPaginatedResponse> {
    return this.repository.getAll(filters);
  }
}