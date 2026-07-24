export interface Vehiculo {
  id: number;

  cliente: number;
  cliente_nombre: string;

  modelo_vehiculo: number;
  modelo_nombre: string;
  marca_nombre: string;

  placa: string;
  anio: number;
  color: string;
  kilometraje_actual: number;
  numero_chasis: string;

  activo: boolean;

  creado_en: string;
  actualizado_en: string;
}

export interface VehiculoFormData {
  modelo_vehiculo: number;
  placa: string;
  anio: number;
  color: string;
  kilometraje_actual: number;
  numero_chasis: string;
}

export interface VehiculoEmpleadoFormData
  extends VehiculoFormData {
  cliente: number;
  activo: boolean;
}

export type VehiculoCreateData =
  | VehiculoFormData
  | VehiculoEmpleadoFormData;

export type VehiculoUpdateData =
  Partial<VehiculoEmpleadoFormData>;

export interface VehiculoFilters {
  search?: string;
  ordering?: string;
  page?: number;
}

export interface VehiculosPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Vehiculo[];
}