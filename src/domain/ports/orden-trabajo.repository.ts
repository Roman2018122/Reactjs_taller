import type {
  OrdenTrabajo,
  OrdenTrabajoFilters,
  OrdenTrabajoPaginatedResponse,
  UpdateOrdenTrabajoEstadoData,

} from "@/domain/entities/orden-trabajo.entity";

export interface OrdenTrabajoRepository {
  getAll(
    filters?: OrdenTrabajoFilters,
  ): Promise<OrdenTrabajoPaginatedResponse>;

  getById(id: number): Promise<OrdenTrabajo>;

  updateEstado(
  id: number,
  data: UpdateOrdenTrabajoEstadoData,
): Promise<OrdenTrabajo>;
}