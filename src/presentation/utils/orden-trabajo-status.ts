import type {
  EstadoOrdenTrabajo,
} from "@/domain/entities/orden-trabajo.entity";

export interface EstadoOrdenTrabajoOption {
  value: EstadoOrdenTrabajo;
  label: string;
}

const ESTADO_LABELS: Record<
  EstadoOrdenTrabajo,
  string
> = {
  RECIBIDO: "Recibido",
  EN_REVISION: "En revisión",
  ESPERANDO_AUTORIZACION:
    "Esperando autorización",
  EN_REPARACION: "En reparación",
  EN_LAVADO: "En lavado",
  LISTO: "Listo",
  ENTREGADO: "Entregado",
  CANCELADO: "Cancelado",
};

const TRANSICIONES_ESTADO: Record<
  EstadoOrdenTrabajo,
  EstadoOrdenTrabajo[]
> = {
  RECIBIDO: [
    "EN_REVISION",
    "CANCELADO",
  ],

  EN_REVISION: [
    "ESPERANDO_AUTORIZACION",
    "EN_REPARACION",
    "CANCELADO",
  ],

  ESPERANDO_AUTORIZACION: [
    "EN_REPARACION",
    "CANCELADO",
  ],

  EN_REPARACION: [
    "EN_LAVADO",
    "LISTO",
    "CANCELADO",
  ],

  EN_LAVADO: [
    "LISTO",
    "CANCELADO",
  ],

  LISTO: [
    "ENTREGADO",
  ],

  ENTREGADO: [],

  CANCELADO: [],
};

export function getEstadoOrdenLabel(
  estado: EstadoOrdenTrabajo,
): string {
  return ESTADO_LABELS[estado];
}

export function getSiguientesEstados(
  estadoActual: EstadoOrdenTrabajo,
): EstadoOrdenTrabajoOption[] {
  return TRANSICIONES_ESTADO[
    estadoActual
  ].map((estado) => ({
    value: estado,
    label: ESTADO_LABELS[estado],
  }));
}

export function esEstadoOrdenFinal(
  estado: EstadoOrdenTrabajo,
): boolean {
  return (
    estado === "ENTREGADO" ||
    estado === "CANCELADO"
  );
}