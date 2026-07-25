import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import type {
  Cliente,
} from "@/domain/entities/cliente.entity";

import { useClienteStore } from "@/presentation/store/cliente.store";

const obtenerNombreCompleto = (
  cliente: Cliente,
): string => {
  const nombreCompleto =
    `${cliente.nombres} ${cliente.apellidos}`.trim();

  if (nombreCompleto) {
    return nombreCompleto;
  }

  return `Cliente ${cliente.id}`;
};

const obtenerTipoCliente = (
  cliente: Cliente,
): string => {
  return cliente.usuario === null
    ? "Presencial"
    : "Portal web";
};

export default function ClientesPage() {
  const navigate = useNavigate();

  const {
    clientes,
    count,
    loading,
    error,
    getClientes,
    deleteCliente,
    clearError,
  } = useClienteStore();

  const [busqueda, setBusqueda] =
    useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void getClientes({
        search: busqueda.trim() || undefined,
      });
    }, 400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    busqueda,
    getClientes,
  ]);

  const handleCrear = (): void => {
    navigate("/empleado/clientes/nuevo");
  };

  const handleVerDetalle = (
    clienteId: number,
  ): void => {
    navigate(
      `/empleado/clientes/${clienteId}`,
    );
  };

  const handleEditar = (
    clienteId: number,
  ): void => {
    navigate(
      `/empleado/clientes/${clienteId}/editar`,
    );
  };

  const handleEliminar = async (
    cliente: Cliente,
  ): Promise<void> => {
    const nombre =
      obtenerNombreCompleto(cliente);

    const confirmado = window.confirm(
      `¿Está seguro de eliminar al cliente ${nombre}?`,
    );

    if (!confirmado) {
      return;
    }

    await deleteCliente(cliente.id);
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Clientes
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Consulta y administra los clientes
            atendidos por el taller.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCrear}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Nuevo cliente
        </button>
      </header>

      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full">
            <label
              htmlFor="buscar-cliente"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Buscar cliente
            </label>

            <input
              id="buscar-cliente"
              type="search"
              value={busqueda}
              placeholder="Buscar por nombre, identificación, teléfono o correo"
              onChange={(event) => {
                setBusqueda(
                  event.target.value,
                );
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <p className="whitespace-nowrap text-sm text-slate-600">
            Total:{" "}
            <span className="font-semibold text-slate-900">
              {count}
            </span>
          </p>
        </div>
      </section>

      {error && (
        <section
          role="alert"
          className="mb-6 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={clearError}
            className="self-start rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 sm:self-auto"
          >
            Cerrar
          </button>
        </section>
      )}

      {loading &&
        clientes.length === 0 && (
          <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 shadow-sm">
            Cargando clientes...
          </p>
        )}

      {!loading &&
        clientes.length === 0 && (
          <section className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              No se encontraron clientes
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              {busqueda.trim()
                ? "No existen clientes que coincidan con la búsqueda."
                : "Todavía no existen clientes registrados en el taller."}
            </p>

            {!busqueda.trim() && (
              <button
                type="button"
                onClick={handleCrear}
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Registrar primer cliente
              </button>
            )}
          </section>
        )}

      {clientes.length > 0 && (
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Cliente
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Identificación
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Teléfono
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Correo
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Tipo
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Estado
                  </th>

                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 bg-white">
                {clientes.map(
                  (cliente) => (
                    <tr
                      key={cliente.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-4 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {obtenerNombreCompleto(
                            cliente,
                          )}
                        </p>

                        
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                        {cliente.identificacion ||
                          "No registrada"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                        {cliente.telefono ||
                          "No registrado"}
                      </td>

                      <td className="max-w-xs px-4 py-4 text-sm text-slate-700">
                        <p className="truncate">
                          {cliente.email ||
                            "No registrado"}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm">
                        <span
                          className={
                            cliente.usuario === null
                              ? "inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700"
                              : "inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700"
                          }
                        >
                          {obtenerTipoCliente(
                            cliente,
                          )}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm">
                        <span
                          className={
                            cliente.activo
                              ? "inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700"
                              : "inline-flex rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700"
                          }
                        >
                          {cliente.activo
                            ? "Activo"
                            : "Inactivo"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              handleVerDetalle(
                                cliente.id,
                              );
                            }}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
                          >
                            Ver
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              handleEditar(
                                cliente.id,
                              );
                            }}
                            className="rounded-lg border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            disabled={loading}
                            onClick={() => {
                              void handleEliminar(
                                cliente,
                              );
                            }}
                            className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}