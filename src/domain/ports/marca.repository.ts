import type {
  Marca,
  MarcaFormData,
  MarcaFilters,
  MarcasPaginatedResponse,
  MarcaUpdateData,
} from "@/domain/entities/marca.entity";

export interface MarcaRepository {
  getAll(): Promise<Marca[]>;

  getPaginated(
    filters?: MarcaFilters,
  ): Promise<MarcasPaginatedResponse>;

  getById(
    id: number,
  ): Promise<Marca>;

  create(
    data: MarcaFormData,
  ): Promise<Marca>;

  update(
    id: number,
    data: MarcaUpdateData,
  ): Promise<Marca>;

  remove(
    id: number,
  ): Promise<void>;
}
