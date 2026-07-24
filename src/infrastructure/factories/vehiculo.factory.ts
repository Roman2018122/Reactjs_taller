import { CreateVehiculoUseCase } from "@/application/use-cases/vehiculos/create-vehiculo.use-case";

import { DeleteVehiculoUseCase } from "@/application/use-cases/vehiculos/delete-vehiculo.use-case";

import { GetVehiculoByIdUseCase } from "@/application/use-cases/vehiculos/get-vehiculo-by-id.use-case";

import { GetVehiculosPaginatedUseCase } from "@/application/use-cases/vehiculos/get-vehiculos-paginated.use-case";

import { GetVehiculosUseCase } from "@/application/use-cases/vehiculos/get-vehiculos.use-case";

import { UpdateVehiculoUseCase } from "@/application/use-cases/vehiculos/update-vehiculo.use-case";

import { AxiosVehiculoRepository } from "@/infrastructure/adapters/axios-vehiculo.repository";

const vehiculoRepository =
  new AxiosVehiculoRepository();

export const getVehiculosUseCase =
  new GetVehiculosUseCase(
    vehiculoRepository,
  );

export const getVehiculosPaginatedUseCase =
  new GetVehiculosPaginatedUseCase(
    vehiculoRepository,
  );

export const getVehiculoByIdUseCase =
  new GetVehiculoByIdUseCase(
    vehiculoRepository,
  );

export const createVehiculoUseCase =
  new CreateVehiculoUseCase(
    vehiculoRepository,
  );

export const updateVehiculoUseCase =
  new UpdateVehiculoUseCase(
    vehiculoRepository,
  );

export const deleteVehiculoUseCase =
  new DeleteVehiculoUseCase(
    vehiculoRepository,
  );