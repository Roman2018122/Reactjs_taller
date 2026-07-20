// src/domain/entities/servicio.entity.ts

export interface Servicio {
  id: number;

  nombre: string;
  descripcion: string;

  precio_referencial: string | null;
  foto: string | null;

  activo: boolean;
  visible_publicamente: boolean;

  creado_en: string;
  actualizado_en: string;
}