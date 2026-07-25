import { GetMarcasUseCase } from "@/application/use-cases/marcas/get-marcas.use-case";
import { GetMarcaByIdUseCase } from "@/application/use-cases/marcas/get-marca-by-id.use-case";
import { CreateMarcaUseCase } from "@/application/use-cases/marcas/create-marca.use-case";
import { UpdateMarcaUseCase } from "@/application/use-cases/marcas/update-marca.use-case";
import { DeleteMarcaUseCase } from "@/application/use-cases/marcas/delete-marca.use-case";

import { AxiosMarcaRepository } from "@/infrastructure/adapters/axios-marca.repository";

const marcaRepository =
  new AxiosMarcaRepository();

export const getMarcasUseCase =
  new GetMarcasUseCase(
    marcaRepository,
  );

export const getMarcaByIdUseCase =
  new GetMarcaByIdUseCase(
    marcaRepository,
  );

export const createMarcaUseCase =
  new CreateMarcaUseCase(
    marcaRepository,
  );

export const updateMarcaUseCase =
  new UpdateMarcaUseCase(
    marcaRepository,
  );

export const deleteMarcaUseCase =
  new DeleteMarcaUseCase(
    marcaRepository,
  );
