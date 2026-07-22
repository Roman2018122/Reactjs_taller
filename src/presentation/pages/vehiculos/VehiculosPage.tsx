
// src/presentation/pages/vehiculos/VehiculosPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { useVehiculoStore } from "@/presentation/store/vehiculo.store";

export default function VehiculosPage() {
  const navigate = useNavigate();

  const vehiculos = useVehiculoStore(
    (state) => state.vehiculos,
  );

  const loading = useVehiculoStore(
    (state) => state.loading,
  );

  const error = useVehiculoStore(
    (state) => state.error,
  );

  const getAll = useVehiculoStore(
    (state) => state.getAll,
  );

  const remove = useVehiculoStore(
    (state) => state.remove,
  );

  const clearError = useVehiculoStore(
    (state) => state.clearError,
  );

  const [busqueda, setBusqueda] =
    useState("");

  useEffect(() => {
    void getAll();
  }, [getAll]);

  const vehiculosFiltrados = useMemo(() => {
    const termino = busqueda
      .trim()
      .toLowerCase();

    if (!termino) {
      return vehiculos;
    }

    return vehiculos.filter((vehiculo) => {
      return (
        vehiculo.placa
          .toLowerCase()
          .includes(termino) ||
        vehiculo.cliente_nombre
          .toLowerCase()
          .includes(termino) ||
        vehiculo.modelo_nombre
          .toLowerCase()
          .includes(termino) ||
        vehiculo.marca_nombre
          .toLowerCase()
          .includes(termino)
      );
    });
  }, [busqueda, vehiculos]);

  const handleCrear = () => {
    navigate("/cliente/vehiculos/nuevo");
  };

  const handleEditar = (
    id: number,
  ) => {
    navigate(`/cliente/vehiculos/${id}/editar`);
  };

  const handleVerDetalle = (
    id: number,
  ) => {
    navigate(`/cliente/vehiculos/${id}`);
  };

  const handleEliminar = async (
    id: number,
    placa: string,
  ) => {
    const confirmado = window.confirm(
      `¿Seguro que deseas eliminar el vehículo con placa ${placa}?`,
    );

    if (!confirmado) {
      return;
    }

    const eliminado = await remove(id);

    if (!eliminado) {
      return;
    }
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Vehículos
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Consulta y administra los vehículos
            registrados en el taller.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCrear}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Nuevo vehículo
        </button>
      </header>

      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <label
          htmlFor="buscar-vehiculo"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Buscar vehículo
        </label>

        <input
          id="buscar-vehiculo"
          type="search"
          value={busqueda}
          placeholder="Buscar por placa, cliente, marca o modelo"
          onChange={(event) => {
            setBusqueda(event.target.value);
          }}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </section>

      {error && (
        <section
          className="mb-6 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
          role="alert"
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

      {loading && (
        <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 shadow-sm">
          Cargando vehículos...
        </p>
      )}

      {!loading &&
        vehiculosFiltrados.length === 0 && (
          <section className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              No se encontraron vehículos
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              No existen registros que coincidan
              con la búsqueda.
            </p>
          </section>
        )}

      {!loading &&
        vehiculosFiltrados.length > 0 && (
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Placa
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Propietario
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Vehículo
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Año
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Color
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Kilometraje
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
                  {vehiculosFiltrados.map(
                    (vehiculo) => (
                      <tr
                        key={vehiculo.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900">
                          {vehiculo.placa}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                          {
                            vehiculo.cliente_nombre
                          }
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                          {vehiculo.marca_nombre}{" "}
                          {
                            vehiculo.modelo_nombre
                          }
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                          {vehiculo.anio}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                          {vehiculo.color}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                          {vehiculo.kilometraje_actual.toLocaleString(
                            "es-EC",
                          )}{" "}
                          km
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          <span
                            className={
                              vehiculo.activo
                                ? "inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700"
                                : "inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
                            }
                          >
                            {vehiculo.activo
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
                                  vehiculo.id,
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
                                  vehiculo.id,
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
                                  vehiculo.id,
                                  vehiculo.placa,
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

