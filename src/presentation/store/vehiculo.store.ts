import { create } from "zustand";

import type {
  Vehiculo,
  VehiculoCreateData,
  VehiculoFilters,
  VehiculoUpdateData,
} from "@/domain/entities/vehiculo.entity";

import {
  createVehiculoUseCase,
  deleteVehiculoUseCase,
  getVehiculoByIdUseCase,
  getVehiculosPaginatedUseCase,
  getVehiculosUseCase,
  updateVehiculoUseCase,
} from "@/infrastructure/factories/vehiculo.factory";

interface VehiculoState {
  vehiculos: Vehiculo[];
  vehiculo: Vehiculo | null;

  count: number;
  next: string | null;
  previous: string | null;

  loading: boolean;
  error: string | null;

  getAll: () => Promise<void>;

  getPaginated: (
    filters?: VehiculoFilters,
  ) => Promise<void>;

  getById: (
    id: number,
  ) => Promise<void>;

  create: (
    data: VehiculoCreateData,
  ) => Promise<boolean>;

  update: (
    id: number,
    data: VehiculoUpdateData,
  ) => Promise<boolean>;

  remove: (
    id: number,
  ) => Promise<boolean>;

  clearVehiculo: () => void;
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

export const useVehiculoStore =
  create<VehiculoState>((set) => ({
    vehiculos: [],
    vehiculo: null,

    count: 0,
    next: null,
    previous: null,

    loading: false,
    error: null,

    getAll: async (): Promise<void> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const vehiculos =
          await getVehiculosUseCase.execute();

        set({
          vehiculos,
          count: vehiculos.length,
        });
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al obtener los vehículos.",
          ),
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    getPaginated: async (
      filters?: VehiculoFilters,
    ): Promise<void> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const response =
          await getVehiculosPaginatedUseCase.execute(
            filters,
          );

        set({
          vehiculos: response.results,
          count: response.count,
          next: response.next,
          previous: response.previous,
        });
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al obtener los vehículos.",
          ),
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    getById: async (
      id: number,
    ): Promise<void> => {
      set({
        loading: true,
        error: null,
        vehiculo: null,
      });

      try {
        const vehiculo =
          await getVehiculoByIdUseCase.execute(id);

        set({
          vehiculo,
        });
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al obtener el vehículo.",
          ),
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    create: async (
      data: VehiculoCreateData,
    ): Promise<boolean> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const nuevoVehiculo =
          await createVehiculoUseCase.execute(
            data,
          );

        set((state) => ({
          vehiculos: [
            nuevoVehiculo,
            ...state.vehiculos,
          ],
          count: state.count + 1,
        }));

        return true;
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al crear el vehículo.",
          ),
        });

        return false;
      } finally {
        set({
          loading: false,
        });
      }
    },

    update: async (
      id: number,
      data: VehiculoUpdateData,
    ): Promise<boolean> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const vehiculoActualizado =
          await updateVehiculoUseCase.execute(
            id,
            data,
          );

        set((state) => ({
          vehiculos: state.vehiculos.map(
            (vehiculo) =>
              vehiculo.id === id
                ? vehiculoActualizado
                : vehiculo,
          ),

          vehiculo:
            state.vehiculo?.id === id
              ? vehiculoActualizado
              : state.vehiculo,
        }));

        return true;
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al actualizar el vehículo.",
          ),
        });

        return false;
      } finally {
        set({
          loading: false,
        });
      }
    },

    remove: async (
      id: number,
    ): Promise<boolean> => {
      set({
        loading: true,
        error: null,
      });

      try {
        await deleteVehiculoUseCase.execute(id);

        set((state) => ({
          vehiculos: state.vehiculos.filter(
            (vehiculo) =>
              vehiculo.id !== id,
          ),

          vehiculo:
            state.vehiculo?.id === id
              ? null
              : state.vehiculo,

          count: Math.max(
            0,
            state.count - 1,
          ),
        }));

        return true;
      } catch (error: unknown) {
        set({
          error: getErrorMessage(
            error,
            "Error al eliminar el vehículo.",
          ),
        });

        return false;
      } finally {
        set({
          loading: false,
        });
      }
    },

    clearVehiculo: (): void => {
      set({
        vehiculo: null,
      });
    },

    clearError: (): void => {
      set({
        error: null,
      });
    },
  }));