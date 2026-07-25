import type {
  MarcaRepository,
} from "@/domain/ports/marca.repository";

export class DeleteMarcaUseCase {
  private readonly repository: MarcaRepository;

  constructor(repository: MarcaRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<void> {
    return this.repository.remove(id);
  }
}
