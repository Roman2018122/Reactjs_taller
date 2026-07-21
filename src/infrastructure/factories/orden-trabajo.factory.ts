import {
  GetOrdenesTrabajoUseCase,
} from "@/application/use-cases/ordenes/get-ordenes-trabajo.use-case";

import {
  GetOrdenTrabajoByIdUseCase,
} from "@/application/use-cases/ordenes/get-orden-trabajo-by-id.use-case";

import {
  AxiosOrdenTrabajoRepository,
} from "@/infrastructure/adapters/axios-orden-trabajo.repository";

import {
  UpdateOrdenTrabajoEstadoUseCase,
} from "@/application/use-cases/ordenes/update-orden-trabajo-estado.use-case";

const ordenTrabajoRepository =
  new AxiosOrdenTrabajoRepository();

export const getOrdenesTrabajoUseCase =
  new GetOrdenesTrabajoUseCase(
    ordenTrabajoRepository,
  );

export const getOrdenTrabajoByIdUseCase =
  new GetOrdenTrabajoByIdUseCase(
    ordenTrabajoRepository,
  );

export const updateOrdenTrabajoEstadoUseCase =
  new UpdateOrdenTrabajoEstadoUseCase(
    ordenTrabajoRepository,
  );