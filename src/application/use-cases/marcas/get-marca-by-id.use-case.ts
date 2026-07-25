import type {
  Marca,
} from "@/domain/entities/marca.entity";

import type {
  MarcaRepository,
} from "@/domain/ports/marca.repository";

export class GetMarcaByIdUseCase {
  private readonly repository: MarcaRepository;

  constructor(repository: MarcaRepository) {
    this.repository = repository;
  }

  execute(id: number): Promise<Marca> {
    return this.repository.getById(id);
  }
}
