export interface ModeloVehiculo {
  id: number;
  marca: number;
  marca_nombre: string;
  nombre: string;
  nombre_completo: string;
  tipo_vehiculo: string;
  activo: boolean;
  creado_en: string;
}

export interface ModeloVehiculoFormData {
  marca: number;
  nombre: string;
  tipo_vehiculo: string;
  activo: boolean;
}

export interface ModeloVehiculoUpdateData {
  marca?: number;
  nombre?: string;
  tipo_vehiculo?: string;
  activo?: boolean;
}

export interface ModeloVehiculoFilters {
  search?: string;
  ordering?: string;
  page?: number;
}

export interface ModeloVehiculoPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ModeloVehiculo[];
}