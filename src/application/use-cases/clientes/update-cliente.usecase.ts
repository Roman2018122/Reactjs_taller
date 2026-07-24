import type {
  Cliente,
  ClienteUpdateData,
} from "@/domain/entities/cliente.entity";

import type {
  ClienteRepository,
} from "@/domain/ports/cliente.repository";

export class UpdateClienteUseCase {
  private readonly repository: ClienteRepository;

  constructor(repository: ClienteRepository) {
    this.repository = repository;
  }

  execute(
    id: number,
    data: ClienteUpdateData,
  ): Promise<Cliente> {
    return this.repository.update(id, data);
  }
}