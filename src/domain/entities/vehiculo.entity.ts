// src/domain/entities/vehiculo.entity.ts

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