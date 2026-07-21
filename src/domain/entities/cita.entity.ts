// src/domain/entities/cita.entity.ts

export type EstadoCita =
  | "SOLICITADA"
  | "CONFIRMADA"
  | "REPROGRAMADA"
  | "CANCELADA"
  | "ATENDIDA"
  | "NO_ASISTIO";

export interface Cita {
  id: number;

  cliente: number;
  cliente_nombre: string;

  vehiculo: number;
  vehiculo_placa: string;

  servicio: number;
  servicio_nombre: string;

  fecha_solicitada: string;

  motivo: string;
  observaciones_cliente: string;

  respuesta_taller: string;

  motivo_cancelacion:
    | string
    | null;

  estado: EstadoCita;
  estado_display: string;

  creado_en: string;
  actualizado_en: string;
}

export interface CitaFormData {
  vehiculo: number;
  servicio: number;
  fecha_solicitada: string;
  motivo: string;
  observaciones_cliente: string;
}

export interface ResponderCitaData {
  estado:
    | "CONFIRMADA"
    | "REPROGRAMADA";

  respuesta_taller: string;

  fecha_solicitada?: string;
}

export interface RegistrarAsistenciaData {
  asistio: boolean;
}

export interface CrearOrdenDesdeCitaData {
  motivo_ingreso: string;

  observaciones_recepcion?:
    | string;

  kilometraje_ingreso?:
    | number
    | null;

  fecha_estimada_entrega?:
    | string
    | null;

  empleado_responsable?:
    | number
    | null;
}
export interface CrearOrdenDesdeCitaData {
  motivo_ingreso: string;

  observaciones_recepcion?:
    | string;

  kilometraje_ingreso?:
    | number
    | null;

  fecha_estimada_entrega?:
    | string
    | null;

  empleado_responsable?:
    | number
    | null;
}