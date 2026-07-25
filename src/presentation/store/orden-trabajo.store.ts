import { create } from "zustand";

import type {
  CrearOrdenSinCitaData,
  EstadoOrdenTrabajo,
  OrdenTrabajo,
  OrdenTrabajoFilters,
} from "@/domain/entities/orden-trabajo.entity";

import {
  crearOrdenSinCitaUseCase,
  getOrdenesTrabajoUseCase,
  getOrdenTrabajoByIdUseCase,
  updateOrdenTrabajoEstadoUseCase,

} from "@/infrastructure/factories/orden-trabajo.factory";

interface OrdenTrabajoState {
  ordenes: OrdenTrabajo[];
  orden: OrdenTrabajo | null;

  count: number;
  next: string | null;
  previous: string | null;

  page: number;
  search: string;
  estado: EstadoOrdenTrabajo | "";

  loading: boolean;
  error: string | null;

  getAll: (
    filters?: OrdenTrabajoFilters,
  ) => Promise<void>;

  getById: (id: number) => Promise<void>;

  create: (
    data: CrearOrdenSinCitaData,
  ) => Promise<OrdenTrabajo>;

  setPage: (page: number) => void;
  setSearch: (search: string) => void;

  setEstado: (
    estado: EstadoOrdenTrabajo | "",
  ) => void;

  clearOrden: () => void;
  clearError: () => void;

  updatingEstado: boolean;

  updateEstado: (
    id: number,
    estado: EstadoOrdenTrabajo,
  ) => Promise<OrdenTrabajo>;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error al cargar las órdenes de trabajo.";
}

export const useOrdenTrabajoStore =
  create<OrdenTrabajoState>((set, get) => ({
    updatingEstado: false,
    ordenes: [],
    orden: null,

    count: 0,
    next: null,
    previous: null,

    page: 1,
    search: "",
    estado: "",

    loading: false,
    error: null,

    getAll: async (filters) => {
      const currentState = get();

      const appliedFilters: OrdenTrabajoFilters = {
        page: filters?.page ?? currentState.page,
        search:
          filters?.search ?? currentState.search,
        estado:
          filters?.estado ?? currentState.estado,
      };

      set({
        loading: true,
        error: null,
      });

      try {
        const response =
          await getOrdenesTrabajoUseCase.execute(
            appliedFilters,
          );

        set({
          ordenes: response.results,
          count: response.count,
          next: response.next,
          previous: response.previous,

          page: appliedFilters.page ?? 1,
          search: appliedFilters.search ?? "",
          estado: appliedFilters.estado ?? "",

          loading: false,
        });
      } catch (error: unknown) {
        set({
          ordenes: [],
          count: 0,
          next: null,
          previous: null,
          loading: false,
          error: getErrorMessage(error),
        });
      }
    },

    getById: async (id) => {
      set({
        loading: true,
        error: null,
        orden: null,
      });

      try {
        const orden =
          await getOrdenTrabajoByIdUseCase.execute(id);

        set({
          orden,
          loading: false,
        });
      } catch (error: unknown) {
        set({
          orden: null,
          loading: false,
          error: getErrorMessage(error),
        });
        
      }
    },

    create: async (
      data: CrearOrdenSinCitaData,
    ): Promise<OrdenTrabajo> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const orden =
          await crearOrdenSinCitaUseCase.execute(data);

        set((state) => ({
          ordenes: [orden, ...state.ordenes],
          count: state.count + 1,
          loading: false,
        }));

        return orden;
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "No se pudo crear la orden de trabajo.";

        set({
          loading: false,
          error: message,
        });

        throw error;
      }
    },

    updateEstado: async (
      id: number,
      estado: EstadoOrdenTrabajo,
    ): Promise<OrdenTrabajo> => {
      set({
        updatingEstado: true,
        error: null,
      });

      try {
        const ordenActualizada =
          await updateOrdenTrabajoEstadoUseCase.execute(
            id,
            {
              estado,
            },
          );

        set((state) => ({
          orden: ordenActualizada,

          ordenes: state.ordenes.map(
            (orden) =>
              orden.id === ordenActualizada.id
                ? ordenActualizada
                : orden,
          ),

          updatingEstado: false,
        }));

        return ordenActualizada;
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "No se pudo actualizar el estado de la orden.";

        set({
          updatingEstado: false,
          error: message,
        });

        throw error;
      }
    },

    setPage: (page) => {
      set({ page });
    },

    setSearch: (search) => {
      set({ search });
    },

    setEstado: (estado) => {
      set({ estado });
    },

    clearOrden: () => {
      set({ orden: null });
    },

    clearError: () => {
      set({ error: null });
    },
  }));