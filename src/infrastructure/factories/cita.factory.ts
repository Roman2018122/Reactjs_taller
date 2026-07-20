// src/infrastructure/factories/cita.factory.ts

import { CreateCitaUseCase } from "@/application/use-cases/citas/create-cita.use-case";
import { DeleteCitaUseCase } from "@/application/use-cases/citas/delete-cita.use-case";
import { GetCitaByIdUseCase } from "@/application/use-cases/citas/get-cita-by-id.use-case";
import { GetCitasUseCase } from "@/application/use-cases/citas/get-citas.use-case";
import { UpdateCitaUseCase } from "@/application/use-cases/citas/update-cita.use-case";
import { CancelCitaUseCase } from "@/application/use-cases/citas/cancel-cita.use-case";

import {ResponderCitaUseCase,} from "@/application/use-cases/citas/responder-cita.use-case";
import {RegistrarAsistenciaUseCase,} from "@/application/use-cases/citas/registrar-asistencia.use-case";

import { AxiosCitaRepository } from "@/infrastructure/adapters/axios-cita.repository";

const citaRepository = new AxiosCitaRepository();

export const getCitasUseCase = new GetCitasUseCase(
  citaRepository,
);

export const getCitaByIdUseCase = new GetCitaByIdUseCase(
  citaRepository,
);

export const createCitaUseCase = new CreateCitaUseCase(
  citaRepository,
);

export const updateCitaUseCase = new UpdateCitaUseCase(
  citaRepository,
);

export const deleteCitaUseCase = new DeleteCitaUseCase(
  citaRepository,
);
export const cancelCitaUseCase =
  new CancelCitaUseCase(citaRepository);

export const responderCitaUseCase =
  new ResponderCitaUseCase(citaRepository,);

export const registrarAsistenciaUseCase =
  new RegistrarAsistenciaUseCase(citaRepository,);