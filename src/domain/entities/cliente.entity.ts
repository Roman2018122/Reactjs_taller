export interface UsuarioResumenCliente {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  nombre_completo: string;
  rol: "CLIENTE";
}

export interface Cliente {
  id: number;
  usuario: number | null;
  usuario_detalle: UsuarioResumenCliente | null;
  nombres: string;
  apellidos: string;
  identificacion: string | null;
  telefono: string;
  email: string;
  direccion: string;
  activo: boolean;
  creado_en: string;
  actualizado_en: string;
}

export interface ClienteFormData {
  nombres: string;
  apellidos: string;
  identificacion: string;
  telefono: string;
  email: string;
  direccion: string;
  activo: boolean;
}

export interface ClienteUpdateData {
  nombres?: string;
  apellidos?: string;
  identificacion?: string | null;
  telefono?: string;
  email?: string;
  direccion?: string;
  activo?: boolean;
}

export interface ClienteFilters {
  search?: string;
  ordering?: string;
  page?: number;
}

export interface ClientesPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Cliente[];
}