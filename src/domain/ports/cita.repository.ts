// src/domain/ports/cita.repository.ts

import type {
  Cita,
  CitaFormData,
  ResponderCitaData,
  RegistrarAsistenciaData,


} from "@/domain/entities/cita.entity";

export interface CitaRepository {
  getAll(): Promise<Cita[]>;

  getById(id: number): Promise<Cita>;

  create(data: CitaFormData): Promise<Cita>;

  update(
    id: number,
    data: CitaFormData,
  ): Promise<Cita>;
  

  remove(id: number): Promise<void>;


  cancelar(
    id: number,
    motivoCancelacion: string,
  ): Promise<Cita>;

  responder(
    id: number,
    data: ResponderCitaData,
  ): Promise<Cita>;

  registrarAsistencia(
  id: number,
  data: RegistrarAsistenciaData,
): Promise<Cita>;
    
}