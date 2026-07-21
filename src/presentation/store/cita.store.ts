// src/presentation/store/cita.store.ts

import { create } from "zustand";

import type {
  Cita,
  CitaFormData,
  ResponderCitaData,
  RegistrarAsistenciaData,
  CrearOrdenDesdeCitaData,


} from "@/domain/entities/cita.entity";
import type {
  OrdenTrabajo,
} from "@/domain/entities/orden-trabajo.entity";

import {
  createCitaUseCase,
  deleteCitaUseCase,
  getCitaByIdUseCase,
  getCitasUseCase,
  updateCitaUseCase,
  cancelCitaUseCase,
  responderCitaUseCase,
  registrarAsistenciaUseCase,
  crearOrdenDesdeCitaUseCase,

} from "@/infrastructure/factories/cita.factory";

interface CitaState {
  citas: Cita[];
  cita: Cita | null;

  loading: boolean;
  error: string | null;

  getAll: () => Promise<void>;
  getById: (id: number) => Promise<void>;

  create: (data: CitaFormData) => Promise<Cita>;
  update: (
    id: number,
    data: CitaFormData,
  ) => Promise<Cita>;

  remove: (id: number) => Promise<void>;


  cancelarCita: (
    id: number,
    motivoCancelacion: string,
  ) => Promise<Cita>;


  clearCita: () => void;
  clearError: () => void;

  responderCita: (
    id: number,
    data: ResponderCitaData,
  ) => Promise<Cita>;

  registrarAsistencia: (
    id: number,
    data: RegistrarAsistenciaData,
  ) => Promise<Cita>;

  crearOrden: (
    citaId: number,
    data: CrearOrdenDesdeCitaData,
  ) => Promise<OrdenTrabajo>;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado.";
}

export const useCitaStore = create<CitaState>(
  (set) => ({
    citas: [],
    cita: null,

    loading: false,
    error: null,

    getAll: async (): Promise<void> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const citas = await getCitasUseCase.execute();

        set({
          citas,
          loading: false,
        });
      } catch (error: unknown) {
        set({
          loading: false,
          error: getErrorMessage(error),
        });
      }
    },

    getById: async (id: number): Promise<void> => {
      set({
        loading: true,
        error: null,
        cita: null,
      });

      try {
        const cita = await getCitaByIdUseCase.execute(id);

        set({
          cita,
          loading: false,
        });
      } catch (error: unknown) {
        set({
          loading: false,
          error: getErrorMessage(error),
        });
      }
    },

    create: async (
      data: CitaFormData,
    ): Promise<Cita> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const nuevaCita =
          await createCitaUseCase.execute(data);

        set((state) => ({
          citas: [nuevaCita, ...state.citas],
          cita: nuevaCita,
          loading: false,
        }));

        return nuevaCita;
      } catch (error: unknown) {
        const message = getErrorMessage(error);

        set({
          loading: false,
          error: message,
        });

        throw error;
      }
    },

    update: async (
      id: number,
      data: CitaFormData,
    ): Promise<Cita> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const citaActualizada =
          await updateCitaUseCase.execute(id, data);

        set((state) => ({
          citas: state.citas.map((cita) =>
            cita.id === id
              ? citaActualizada
              : cita,
          ),
          cita: citaActualizada,
          loading: false,
        }));

        return citaActualizada;
      } catch (error: unknown) {
        const message = getErrorMessage(error);

        set({
          loading: false,
          error: message,
        });

        throw error;
      }
    },

    remove: async (id: number): Promise<void> => {
      set({
        loading: true,
        error: null,
      });

      try {
        await deleteCitaUseCase.execute(id);

        set((state) => ({
          citas: state.citas.filter(
            (cita) => cita.id !== id,
          ),
          cita:
            state.cita?.id === id
              ? null
              : state.cita,
          loading: false,
        }));
      } catch (error: unknown) {
        const message = getErrorMessage(error);

        set({
          loading: false,
          error: message,
        });

        throw error;
      }
    },

    clearCita: (): void => {
      set({
        cita: null,
      });
    },

    clearError: (): void => {
      set({
        error: null,
      });
    },

    cancelarCita: async (
      id: number,
      motivoCancelacion: string,
    ): Promise<Cita> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const citaActualizada =
          await cancelCitaUseCase.execute(
            id,
            motivoCancelacion,
          );

        set((state) => ({
          citas: state.citas.map((cita) =>
            cita.id === id
              ? citaActualizada
              : cita,
          ),
          cita:
            state.cita?.id === id
              ? citaActualizada
              : state.cita,
          loading: false,
        }));

        return citaActualizada;
      } catch (error: unknown) {
        const message = getErrorMessage(error);

        set({
          loading: false,
          error: message,
        });

        throw error;
      }
    },

    responderCita: async (
      id,
      data,
    ): Promise<Cita> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const citaActualizada =
          await responderCitaUseCase.execute(
            id,
            data,
          );

        set((state) => ({
          citas: state.citas.map(
            (cita) =>
              cita.id === id
                ? citaActualizada
                : cita,
          ),

          cita:
            state.cita?.id === id
              ? citaActualizada
              : state.cita,

          loading: false,
        }));

        return citaActualizada;
      } catch (error) {
        const mensaje =
          error instanceof Error
            ? error.message
            : "No fue posible responder la cita.";

        set({
          loading: false,
          error: mensaje,
        });

        throw error;
      }
    },
    registrarAsistencia: async (
      id,
      data,
    ) => {
      set({
        loading: true,
        error: null,
      });

      try {
        const citaActualizada =
          await registrarAsistenciaUseCase
            .execute(
              id,
              data,
            );

        set((state) => ({
          cita: citaActualizada,

          citas: state.citas.map(
            (cita) =>
              cita.id === id
                ? citaActualizada
                : cita,
          ),

          loading: false,
        }));

        return citaActualizada;
      } catch (error) {
        const mensaje =
          error instanceof Error
            ? error.message
            : "No se pudo registrar la asistencia.";

        set({
          loading: false,
          error: mensaje,
        });

        throw error;
      }
    },

    crearOrden: async (
      citaId,
      data,
    ) => {
      set({
        loading: true,
        error: null,
      });

      try {
        const orden =
          await crearOrdenDesdeCitaUseCase
            .execute(
              citaId,
              data,
            );

        set({
          loading: false,
          error: null,
        });

        return orden;
      } catch (error) {
        const mensaje =
          error instanceof Error
            ? error.message
            : (
                "No se pudo crear la " +
                "orden de trabajo."
              );

        set({
          loading: false,
          error: mensaje,
        });

        throw error;
      }
    },
  }),
);