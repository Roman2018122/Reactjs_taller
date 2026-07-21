export type EstadoOrdenTrabajo =
  | "RECIBIDO"
  | "EN_REVISION"
  | "ESPERANDO_AUTORIZACION"
  | "EN_REPARACION"
  | "EN_LAVADO"
  | "LISTO"
  | "ENTREGADO"
  | "CANCELADO";

export interface OrdenTrabajo {
  id: number;
  numero_orden: string;

  vehiculo: number;
  vehiculo_placa: string;

  cliente_id: number;
  cliente_nombre: string;

  cita: number | null;

  empleado_recepciona: number;
  empleado_recepciona_nombre: string;

  empleado_responsable:
    | number
    | null;

  empleado_responsable_nombre:
    | string
    | null;

  estado: EstadoOrdenTrabajo;
  estado_display: string;

  motivo_ingreso: string;

  observaciones_recepcion:
    | string
    | null;

  kilometraje_ingreso:
    | number
    | null;

  fecha_ingreso: string;

  fecha_estimada_entrega:
    | string
    | null;

  fecha_entrega:
    | string
    | null;

  subtotal: string;
  descuento: string;
  total: string;

  activo: boolean;

  historial_estados: unknown[];
  detalles_servicios: unknown[];

  creado_en: string;
  actualizado_en: string;
}