// src/presentation/store/modelo-vehiculo.store.ts

import { create } from "zustand";

import type {
  ModeloVehiculo,
  ModeloVehiculoFormData,
} from "@/domain/entities/modelo-vehiculo.entity";
import {
  getModelosVehiculoUseCase,
  getModeloVehiculoByIdUseCase,
  createModeloVehiculoUseCase,
} from "@/infrastructure/factories/modelo-vehiculo.factory";

function getErrorMessage(
  error: unknown,
  defaultMessage: string,
): string {
  return error instanceof Error
    ? error.message
    : defaultMessage;
}

export interface ModeloVehiculoState {
  modelos: ModeloVehiculo[];
  modeloSeleccionado: ModeloVehiculo | null;

  isLoading: boolean;
  error: string | null;

  getAll: () => Promise<void>;
  getById: (id: number) => Promise<void>;
  create: (
    data: ModeloVehiculoFormData,
  ) => Promise<boolean>;

  setModeloSeleccionado: (
    modelo: ModeloVehiculo | null,
  ) => void;
  clearModeloSeleccionado: () => void;
  clearError: () => void;
}

export const useModeloVehiculoStore =
  create<ModeloVehiculoState>((set) => ({
    modelos: [],
    modeloSeleccionado: null,
    isLoading: false,
    error: null,

    getAll: async (): Promise<void> => {
      set({
        isLoading: true,
        error: null,
      });

      try {
        const modelos =
          await getModelosVehiculoUseCase.execute();

        set({
          modelos,
          isLoading: false,
        });
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al obtener los modelos de vehículos.",
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
        const modelo =
          await getModeloVehiculoByIdUseCase.execute(id);

        set({
          modeloSeleccionado: modelo,
          isLoading: false,
        });
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al obtener el modelo de vehículo.",
          ),
          isLoading: false,
        });
      }
    },

    create: async (
      data: ModeloVehiculoFormData,
    ): Promise<boolean> => {
      set({
        isLoading: true,
        error: null,
      });

      try {
        const nuevoModelo =
          await createModeloVehiculoUseCase.execute(data);

        set((state) => ({
          modelos: [
            ...state.modelos,
            nuevoModelo,
          ],
          isLoading: false,
        }));

        return true;
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al crear el modelo de vehículo.",
          ),
          isLoading: false,
        });

        return false;
      }
    },

    setModeloSeleccionado: (
      modelo: ModeloVehiculo | null,
    ): void => {
      set({
        modeloSeleccionado: modelo,
      });
    },

    clearModeloSeleccionado: (): void => {
      set({
        modeloSeleccionado: null,
      });
    },

    clearError: (): void => {
      set({
        error: null,
      });
    },
  }));