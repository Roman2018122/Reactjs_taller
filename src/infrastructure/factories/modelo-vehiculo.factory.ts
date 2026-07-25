// src/infrastructure/factories/modelo-vehiculo.factory.ts

import { GetModelosVehiculoUseCase } from "@/application/use-cases/modelos-vehiculo/get-modelos-vehiculo.use-case";
import { GetModeloVehiculoByIdUseCase } from "@/application/use-cases/modelos-vehiculo/get-modelo-vehiculo-by-id.use-case";
import { CreateModeloVehiculoUseCase } from "@/application/use-cases/modelos-vehiculo/create-modelo-vehiculo.use-case";
import { UpdateModeloVehiculoUseCase } from "@/application/use-cases/modelos-vehiculo/update-modelo-vehiculo.use-case";
import { DeleteModeloVehiculoUseCase } from "@/application/use-cases/modelos-vehiculo/delete-modelo-vehiculo.use-case";

import { AxiosModeloVehiculoRepository } from "@/infrastructure/adapters/axios-modelo-vehiculo.repository";

const modeloVehiculoRepository =
  new AxiosModeloVehiculoRepository();

export const getModelosVehiculoUseCase =
  new GetModelosVehiculoUseCase(
    modeloVehiculoRepository,
  );

export const getModeloVehiculoByIdUseCase =
  new GetModeloVehiculoByIdUseCase(
    modeloVehiculoRepository,
  );

export const createModeloVehiculoUseCase =
  new CreateModeloVehiculoUseCase(
    modeloVehiculoRepository,
  );

export const updateModeloVehiculoUseCase =
  new UpdateModeloVehiculoUseCase(
    modeloVehiculoRepository,
  );

export const deleteModeloVehiculoUseCase =
  new DeleteModeloVehiculoUseCase(
    modeloVehiculoRepository,
  );