// src/infrastructure/factories/servicio.factory.ts

import { GetServiciosUseCase } from "@/application/use-cases/servicios/get-servicios.use-case";

import { AxiosServicioRepository } from "@/infrastructure/adapters/axios-servicio.repository";

const servicioRepository =
  new AxiosServicioRepository();

export const getServiciosUseCase =
  new GetServiciosUseCase(
    servicioRepository,
  );