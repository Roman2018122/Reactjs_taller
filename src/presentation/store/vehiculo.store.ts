// src/presentation/store/vehiculo.store.ts

import { create } from "zustand";

import type {
  Vehiculo,
  VehiculoFormData,
} from "@/domain/entities/vehiculo.entity";

import { vehiculoUseCase } from "@/infrastructure/factories/vehiculo.factory";

interface VehiculoState {
  vehiculos: Vehiculo[];
  vehiculo: Vehiculo | null;

  loading: boolean;
  error: string | null;

  getAll: () => Promise<void>;

  getById: (id: number) => Promise<void>;

  create: (
    data: VehiculoFormData,
  ) => Promise<boolean>;

  update: (
    id: number,
    data: VehiculoFormData,
  ) => Promise<boolean>;

  remove: (
    id: number,
  ) => Promise<boolean>;

  clearVehiculo: () => void;

  clearError: () => void;
}

export const useVehiculoStore =
  create<VehiculoState>((set) => ({
    vehiculos: [],

    vehiculo: null,

    loading: false,

    error: null,

    getAll: async () => {
      set({
        loading: true,
        error: null,
      });

      try {
        const vehiculos =
          await vehiculoUseCase.getAll();

        set({
          vehiculos,
        });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Error al obtener los vehículos.",
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    getById: async (id) => {
      set({
        loading: true,
        error: null,
      });

      try {
        const vehiculo =
          await vehiculoUseCase.getById(id);

        set({
          vehiculo,
        });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Error al obtener el vehículo.",
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    create: async (data) => {
      set({
        loading: true,
        error: null,
      });

      try {
        const nuevoVehiculo =
          await vehiculoUseCase.create(data);

        set((state) => ({
          vehiculos: [
            ...state.vehiculos,
            nuevoVehiculo,
          ],
        }));

        return true;
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Error al crear el vehículo.",
        });

        return false;
      } finally {
        set({
          loading: false,
        });
      }
    },

    update: async (
      id,
      data,
    ) => {
      set({
        loading: true,
        error: null,
      });

      try {
        const vehiculoActualizado =
          await vehiculoUseCase.update(
            id,
            data,
          );

        set((state) => ({
          vehiculos:
            state.vehiculos.map((vehiculo) =>
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
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Error al actualizar el vehículo.",
        });

        return false;
      } finally {
        set({
          loading: false,
        });
      }
    },

    remove: async (id) => {
      set({
        loading: true,
        error: null,
      });

      try {
        await vehiculoUseCase.remove(id);

        set((state) => ({
          vehiculos:
            state.vehiculos.filter(
              (vehiculo) =>
                vehiculo.id !== id,
            ),

          vehiculo:
            state.vehiculo?.id === id
              ? null
              : state.vehiculo,
        }));

        return true;
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Error al eliminar el vehículo.",
        });

        return false;
      } finally {
        set({
          loading: false,
        });
      }
    },

    clearVehiculo: () => {
      set({
        vehiculo: null,
      });
    },

    clearError: () => {
      set({
        error: null,
      });
    },
  }));