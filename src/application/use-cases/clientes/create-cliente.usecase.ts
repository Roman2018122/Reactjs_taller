import type {
  Cliente,
  ClienteFormData,
} from "@/domain/entities/cliente.entity";

import type {
  ClienteRepository,
} from "@/domain/ports/cliente.repository";

export class CreateClienteUseCase {
  private readonly repository: ClienteRepository;

  constructor(repository: ClienteRepository) {
    this.repository = repository;
  }

  execute(data: ClienteFormData): Promise<Cliente> {
    return this.repository.create(data);
  }
}