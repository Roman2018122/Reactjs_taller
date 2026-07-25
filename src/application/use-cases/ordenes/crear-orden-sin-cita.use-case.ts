import type {
  CrearOrdenSinCitaData,
  OrdenTrabajo,
} from "@/domain/entities/orden-trabajo.entity";

import type {
  OrdenTrabajoRepository,
} from "@/domain/ports/orden-trabajo.repository";

export class CrearOrdenSinCitaUseCase {
  private readonly repository: OrdenTrabajoRepository;

  constructor(
    repository: OrdenTrabajoRepository,
  ) {
    this.repository = repository;
  }

  async execute(
    data: CrearOrdenSinCitaData,
  ): Promise<OrdenTrabajo> {
    if (
      !Number.isInteger(data.vehiculo) ||
      data.vehiculo <= 0
    ) {
      throw new Error(
        "El vehículo seleccionado no es válido.",
      );
    }

    if (
      !Number.isInteger(data.cliente) ||
      data.cliente <= 0
    ) {
      throw new Error(
        "El cliente seleccionado no es válido.",
      );
    }

    if (
      !data.motivo_ingreso ||
      data.motivo_ingreso.trim().length === 0
    ) {
      throw new Error(
        "El motivo de ingreso es obligatorio.",
      );
    }

    return this.repository.create({
      vehiculo: data.vehiculo,
      cliente: data.cliente,
      motivo_ingreso: data.motivo_ingreso.trim(),
      observaciones_recepcion:
        data.observaciones_recepcion || undefined,
      kilometraje_ingreso:
        data.kilometraje_ingreso ?? null,
      fecha_estimada_entrega:
        data.fecha_estimada_entrega || null,
      empleado_responsable:
        data.empleado_responsable ?? null,
      cita: null,
    });
  }
}
