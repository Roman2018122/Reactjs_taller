import type {
  Cliente,
} from "@/domain/entities/cliente.entity";

import type {
  ClienteRepository,
} from "@/domain/ports/cliente.repository";

export class GetClienteByIdUseCase {
  private readonly repository: ClienteRepository;

  constructor(repository: ClienteRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<Cliente> {
    return this.repository.getById(id);
  }
}