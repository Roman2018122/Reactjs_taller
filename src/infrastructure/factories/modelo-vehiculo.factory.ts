// src/infrastructure/factories/modelo-vehiculo.factory.ts

import { ModeloVehiculoUseCase } from "@/application/use-cases/modelo-vehiculo.use-case";

import { AxiosModeloVehiculoRepository } from "@/infrastructure/adapters/axios-modelo-vehiculo.repository";

const modeloVehiculoRepository =
  new AxiosModeloVehiculoRepository();

export const modeloVehiculoUseCase =
  new ModeloVehiculoUseCase(
    modeloVehiculoRepository,
  );