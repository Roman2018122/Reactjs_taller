import { create } from "zustand";

import type {
  Marca,
  MarcaFormData,
  MarcaUpdateData,
} from "@/domain/entities/marca.entity";

import {
  getMarcasUseCase,
  getMarcaByIdUseCase,
  createMarcaUseCase,
  updateMarcaUseCase,
  deleteMarcaUseCase,
} from "@/infrastructure/factories/marca.factory";

interface MarcaState {
  marcas: Marca[];
  marcaSeleccionada: Marca | null;

  isLoading: boolean;
  error: string | null;

  getAll: () => Promise<void>;

  getById: (
    id: number,
  ) => Promise<void>;

  create: (
    data: MarcaFormData,
  ) => Promise<boolean>;

  update: (
    id: number,
    data: MarcaUpdateData,
  ) => Promise<boolean>;

  remove: (
    id: number,
  ) => Promise<boolean>;

  setMarcaSeleccionada: (
    marca: Marca | null,
  ) => void;

  clearMarcaSeleccionada: () => void;
  clearError: () => void;
}

function getErrorMessage(
  error: unknown,
  defaultMessage: string,
): string {
  return error instanceof Error
    ? error.message
    : defaultMessage;
}

export const useMarcaStore =
  create<MarcaState>((set) => ({
    marcas: [],
    marcaSeleccionada: null,
    isLoading: false,
    error: null,

    getAll: async (): Promise<void> => {
      set({
        isLoading: true,
        error: null,
      });

      try {
        const marcas =
          await getMarcasUseCase.execute();

        set({
          marcas,
          isLoading: false,
        });
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al obtener las marcas.",
          ),
          isLoading: false,
        });
      }
    },

    getById: async (
      id: number,
    ): Promise<void> => {
      set({
        isLoading: true,
        error: null,
      });

      try {
        const marca =
          await getMarcaByIdUseCase.execute(id);

        set({
          marcaSeleccionada: marca,
          isLoading: false,
        });
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al obtener la marca.",
          ),
          isLoading: false,
        });
      }
    },

    create: async (
      data: MarcaFormData,
    ): Promise<boolean> => {
      set({
        isLoading: true,
        error: null,
      });

      try {
        const nuevaMarca =
          await createMarcaUseCase.execute(data);

        set((state) => ({
          marcas: [
            ...state.marcas,
            nuevaMarca,
          ],
          isLoading: false,
        }));

        return true;
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al crear la marca.",
          ),
          isLoading: false,
        });

        return false;
      }
    },

    update: async (
      id: number,
      data: MarcaUpdateData,
    ): Promise<boolean> => {
      set({
        isLoading: true,
        error: null,
      });

      try {
        const marcaActualizada =
          await updateMarcaUseCase.execute(
            id,
            data,
          );

        set((state) => ({
          marcas: state.marcas.map((marca) =>
            marca.id === id
              ? marcaActualizada
              : marca,
          ),

          marcaSeleccionada:
            state.marcaSeleccionada?.id === id
              ? marcaActualizada
              : state.marcaSeleccionada,

          isLoading: false,
        }));

        return true;
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al actualizar la marca.",
          ),
          isLoading: false,
        });

        return false;
      }
    },

    remove: async (
      id: number,
    ): Promise<boolean> => {
      set({
        isLoading: true,
        error: null,
      });

      try {
        await deleteMarcaUseCase.execute(id);

        set((state) => ({
          marcas: state.marcas.filter(
            (marca) => marca.id !== id,
          ),

          marcaSeleccionada:
            state.marcaSeleccionada?.id === id
              ? null
              : state.marcaSeleccionada,

          isLoading: false,
        }));

        return true;
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al eliminar la marca.",
          ),
          isLoading: false,
        });

        return false;
      }
    },

    setMarcaSeleccionada: (
      marca: Marca | null,
    ): void => {
      set({
        marcaSeleccionada: marca,
      });
    },

    clearMarcaSeleccionada: (): void => {
      set({
        marcaSeleccionada: null,
      });
    },

    clearError: (): void => {
      set({
        error: null,
      });
    },
  }));
