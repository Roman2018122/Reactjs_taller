// src/presentation/store/servicio.store.ts

import { create } from "zustand";

import type { Servicio } from "@/domain/entities/servicio.entity";

import { getServiciosUseCase } from "@/infrastructure/factories/servicio.factory";

interface ServicioState {
  servicios: Servicio[];

  isLoading: boolean;
  error: string | null;

  getAll: () => Promise<void>;
  clearError: () => void;
}

function getErrorMessage(
  error: unknown,
): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error al cargar los servicios.";
}

export const useServicioStore =
  create<ServicioState>((set) => ({
    servicios: [],

    isLoading: false,
    error: null,

    getAll: async (): Promise<void> => {
      set({
        isLoading: true,
        error: null,
      });

      try {
        const servicios =
          await getServiciosUseCase.execute();

        set({
          servicios,
          isLoading: false,
        });
      } catch (error: unknown) {
        set({
          isLoading: false,
          error: getErrorMessage(error),
        });
      }
    },

    clearError: (): void => {
      set({
        error: null,
      });
    },
  }));