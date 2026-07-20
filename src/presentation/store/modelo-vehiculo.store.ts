// src/presentation/store/modelo-vehiculo.store.ts

import { create } from "zustand";

import type { ModeloVehiculo } from "@/domain/entities/modelo-vehiculo.entity";
import { modeloVehiculoUseCase } from "@/infrastructure/factories/modelo-vehiculo.factory";

export interface ModeloVehiculoState {
  modelos: ModeloVehiculo[];
  modeloSeleccionado: ModeloVehiculo | null;

  isLoading: boolean;
  error: string | null;

  getAll: () => Promise<void>;
  getById: (id: number) => Promise<void>;
  
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
          await modeloVehiculoUseCase.getAll();

        set({
          modelos,
          isLoading: false,
        });
      } catch (error: unknown) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Error al obtener los modelos de vehículos.",
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
          await modeloVehiculoUseCase.getById(id);

        set({
          modeloSeleccionado: modelo,
          isLoading: false,
        });
      } catch (error: unknown) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Error al obtener el modelo de vehículo.",
          isLoading: false,
        });
      }
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