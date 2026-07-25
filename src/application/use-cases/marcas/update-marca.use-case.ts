import type {
  Marca,
  MarcaUpdateData,
} from "@/domain/entities/marca.entity";

import type {
  MarcaRepository,
} from "@/domain/ports/marca.repository";

export class UpdateMarcaUseCase {
  private readonly repository: MarcaRepository;

  constructor(repository: MarcaRepository) {
    this.repository = repository;
  }

  execute(
    id: number,
    data: MarcaUpdateData,
  ): Promise<Marca> {
    return this.repository.update(id, data);
  }
}
