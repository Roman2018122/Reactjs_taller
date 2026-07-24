import type {
  Vehiculo,
  VehiculoCreateData,
  VehiculoFilters,
  VehiculosPaginatedResponse,
  VehiculoUpdateData,
} from "@/domain/entities/vehiculo.entity";

export interface VehiculoRepository {
  getAll(): Promise<Vehiculo[]>;

  getPaginated(
    filters?: VehiculoFilters,
  ): Promise<VehiculosPaginatedResponse>;

  getById(
    id: number,
  ): Promise<Vehiculo>;

  create(
    data: VehiculoCreateData,
  ): Promise<Vehiculo>;

  update(
    id: number,
    data: VehiculoUpdateData,
  ): Promise<Vehiculo>;

  remove(
    id: number,
  ): Promise<void>;
}