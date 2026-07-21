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

  historial_estados: HistorialEstadoOrden[];
  detalles_servicios: DetalleServicioOrden[];

  creado_en: string;
  actualizado_en: string;
}
export interface HistorialEstadoOrden {
  id: number;
  orden: number;

  estado_anterior:
    | EstadoOrdenTrabajo
    | null;

  estado_anterior_display:
    | string
    | null;

  estado_nuevo: EstadoOrdenTrabajo;
  estado_nuevo_display: string;

  titulo: string;
  descripcion: string;

  visible_cliente: boolean;

  empleado:
    | number
    | null;

  empleado_nombre:
    | string
    | null;

  creado_en: string;
}

export interface DetalleServicioOrden {
  id: number;

  orden: number;
  orden_numero: string;

  vehiculo_placa: string;

  servicio: number;
  servicio_nombre: string;

  diagnostico:
    | number
    | null;

  diagnostico_titulo:
    | string
    | null;

  empleado:
    | number
    | null;

  empleado_nombre:
    | string
    | null;

  descripcion: string;

  cantidad: number;

  precio_unitario: string;
  subtotal: string;

  estado: string;
  estado_display: string;

  visible_cliente: boolean;

  fecha_inicio:
    | string
    | null;

  fecha_finalizacion:
    | string
    | null;

  creado_en: string;
  actualizado_en: string;
}

export interface OrdenTrabajoPaginatedResponse {
  count: number;

  next:
    | string
    | null;

  previous:
    | string
    | null;

  results: OrdenTrabajo[];
}

export interface OrdenTrabajoFilters {
  page?: number;

  search?: string;

  estado?:
    | EstadoOrdenTrabajo
    | "";
}

export interface UpdateOrdenTrabajoEstadoData {
  estado: EstadoOrdenTrabajo;
}