import { VehiculoUseCase } from "@/application/use-cases/vehiculo.use-case";
import { AxiosVehiculoRepository } from "@/infrastructure/adapters/axios-vehiculo.repository";

const vehiculoRepository =
  new AxiosVehiculoRepository();

export const vehiculoUseCase =
  new VehiculoUseCase(
    vehiculoRepository,
  );