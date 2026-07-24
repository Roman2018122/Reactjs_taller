import type {
  ClienteRepository,
} from "@/domain/ports/cliente.repository";

export class DeleteClienteUseCase {
  private readonly repository: ClienteRepository;

  constructor(repository: ClienteRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}