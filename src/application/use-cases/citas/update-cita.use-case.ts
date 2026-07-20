// src/application/use-cases/citas/update-cita.use-case.ts

import type {
  Cita,
  CitaFormData,
} from "@/domain/entities/cita.entity";
import type { CitaRepository } from "@/domain/ports/cita.repository";

export class UpdateCitaUseCase {
  private readonly repository: CitaRepository;

  constructor(repository: CitaRepository) {
    this.repository = repository;
  }

  execute(
    id: number,
    data: CitaFormData,
  ): Promise<Cita> {
    const motivo = data.motivo.trim();
    const observacionesCliente =
      data.observaciones_cliente.trim();

    if (!Number.isInteger(id) || id <= 0) {
      return Promise.reject(
        new Error("El identificador de la cita no es válido."),
      );
    }

    if (
      !Number.isInteger(data.vehiculo) ||
      data.vehiculo <= 0
    ) {
      return Promise.reject(
        new Error("Debe seleccionar un vehículo válido."),
      );
    }

    if (
      !Number.isInteger(data.servicio) ||
      data.servicio <= 0
    ) {
      return Promise.reject(
        new Error("Debe seleccionar un servicio válido."),
      );
    }

    if (data.fecha_solicitada.trim() === "") {
      return Promise.reject(
        new Error("La fecha solicitada es obligatoria."),
      );
    }

    const fechaSolicitada = new Date(
      data.fecha_solicitada,
    );

    if (Number.isNaN(fechaSolicitada.getTime())) {
      return Promise.reject(
        new Error("La fecha solicitada no es válida."),
      );
    }

    if (motivo === "") {
      return Promise.reject(
        new Error("El motivo de la cita es obligatorio."),
      );
    }

    const citaData: CitaFormData = {
      vehiculo: data.vehiculo,
      servicio: data.servicio,
      fecha_solicitada: data.fecha_solicitada,
      motivo,
      observaciones_cliente: observacionesCliente,
    };

    return this.repository.update(id, citaData);
  }
}