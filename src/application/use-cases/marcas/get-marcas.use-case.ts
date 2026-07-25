import type {
  Marca,
} from "@/domain/entities/marca.entity";

import type {
  MarcaRepository,
} from "@/domain/ports/marca.repository";

export class GetMarcasUseCase {
  private readonly repository: MarcaRepository;

  constructor(repository: MarcaRepository) {
    this.repository = repository;
  }

  execute(): Promise<Marca[]> {
    return this.repository.getAll();
  }
}
