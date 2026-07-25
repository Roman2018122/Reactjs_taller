export interface Marca {
  id: number;
  nombre: string;
  pais_origen: string;
  activa: boolean;
  creado_en: string;
}

export interface MarcaFormData {
  nombre: string;
  pais_origen: string;
  activa: boolean;
}

export interface MarcaUpdateData {
  nombre?: string;
  pais_origen?: string;
  activa?: boolean;
}

export interface MarcaFilters {
  search?: string;
  ordering?: string;
  page?: number;
}

export interface MarcasPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Marca[];
}
