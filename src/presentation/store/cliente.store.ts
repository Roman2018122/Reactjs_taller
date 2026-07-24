import { create } from "zustand";

import type {
  Cliente,
  ClienteFilters,
  ClienteFormData,
  ClienteUpdateData,
} from "@/domain/entities/cliente.entity";

import { clienteFactory } from "@/infrastructure/factories/cliente.factory";

interface ClienteState {
  clientes: Cliente[];
  clienteSeleccionado: Cliente | null;

  count: number;
  next: string | null;
  previous: string | null;

  loading: boolean;
  error: string | null;

  getClientes: (
    filters?: ClienteFilters,
  ) => Promise<void>;

  getClienteById: (
    id: number,
  ) => Promise<Cliente | null>;

  createCliente: (
    data: ClienteFormData,
  ) => Promise<Cliente | null>;

  updateCliente: (
    id: number,
    data: ClienteUpdateData,
  ) => Promise<Cliente | null>;

  deleteCliente: (
    id: number,
  ) => Promise<boolean>;

  clearClienteSeleccionado: () => void;
  clearError: () => void;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado.";
};

export const useClienteStore = create<ClienteState>(
  (set) => ({
    clientes: [],
    clienteSeleccionado: null,

    count: 0,
    next: null,
    previous: null,

    loading: false,
    error: null,

    getClientes: async (
      filters?: ClienteFilters,
    ): Promise<void> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const response =
          await clienteFactory.getClientes.execute(
            filters,
          );

        set({
          clientes: response.results,
          count: response.count,
          next: response.next,
          previous: response.previous,
          loading: false,
        });
      } catch (error: unknown) {
        set({
          loading: false,
          error: getErrorMessage(error),
        });
      }
    },

    getClienteById: async (
      id: number,
    ): Promise<Cliente | null> => {
      set({
        loading: true,
        error: null,
        clienteSeleccionado: null,
      });

      try {
        const cliente =
          await clienteFactory.getClienteById.execute(
            id,
          );

        set({
          clienteSeleccionado: cliente,
          loading: false,
        });

        return cliente;
      } catch (error: unknown) {
        set({
          loading: false,
          error: getErrorMessage(error),
        });

        return null;
      }
    },

    createCliente: async (
      data: ClienteFormData,
    ): Promise<Cliente | null> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const cliente =
          await clienteFactory.createCliente.execute(
            data,
          );

        set((state) => ({
          clientes: [
            cliente,
            ...state.clientes,
          ],
          clienteSeleccionado: cliente,
          count: state.count + 1,
          loading: false,
        }));

        return cliente;
      } catch (error: unknown) {
        set({
          loading: false,
          error: getErrorMessage(error),
        });

        return null;
      }
    },

    updateCliente: async (
      id: number,
      data: ClienteUpdateData,
    ): Promise<Cliente | null> => {
      set({
        loading: true,
        error: null,
      });

      try {
        const clienteActualizado =
          await clienteFactory.updateCliente.execute(
            id,
            data,
          );

        set((state) => ({
          clientes: state.clientes.map(
            (cliente) =>
              cliente.id === id
                ? clienteActualizado
                : cliente,
          ),
          clienteSeleccionado:
            state.clienteSeleccionado?.id === id
              ? clienteActualizado
              : state.clienteSeleccionado,
          loading: false,
        }));

        return clienteActualizado;
      } catch (error: unknown) {
        set({
          loading: false,
          error: getErrorMessage(error),
        });

        return null;
      }
    },

    deleteCliente: async (
      id: number,
    ): Promise<boolean> => {
      set({
        loading: true,
        error: null,
      });

      try {
        await clienteFactory.deleteCliente.execute(id);

        set((state) => ({
          clientes: state.clientes.filter(
            (cliente) => cliente.id !== id,
          ),
          clienteSeleccionado:
            state.clienteSeleccionado?.id === id
              ? null
              : state.clienteSeleccionado,
          count: Math.max(0, state.count - 1),
          loading: false,
        }));

        return true;
      } catch (error: unknown) {
        set({
          loading: false,
          error: getErrorMessage(error),
        });

        return false;
      }
    },

    clearClienteSeleccionado: (): void => {
      set({
        clienteSeleccionado: null,
      });
    },

    clearError: (): void => {
      set({
        error: null,
      });
    },
  }),
);