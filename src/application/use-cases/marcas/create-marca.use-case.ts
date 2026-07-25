import type {
  Marca,
  MarcaFormData,
} from "@/domain/entities/marca.entity";

import type {
  MarcaRepository,
} from "@/domain/ports/marca.repository";

export class CreateMarcaUseCase {
  private readonly repository: MarcaRepository;

  constructor(repository: MarcaRepository) {
    this.repository = repository;
  }

  execute(
    data: MarcaFormData,
  ): Promise<Marca> {
    return this.repository.create(data);
  }
}
