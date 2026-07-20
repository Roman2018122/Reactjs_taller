// src/presentation/pages/empleado/citas/CitasEmpleadoPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import type {
  Cita,
  EstadoCita,
} from "@/domain/entities/cita.entity";

import { useCitaStore } from "@/presentation/store/cita.store";

function formatearFecha(fecha: string): string {
  const fechaConvertida = new Date(fecha);

  if (Number.isNaN(fechaConvertida.getTime())) {
    return fecha;
  }

  return new Intl.DateTimeFormat("es-EC", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(fechaConvertida);
}

function obtenerClaseEstado(
  estado: EstadoCita,
): string {
  const clases: Record<EstadoCita, string> = {
    SOLICITADA:
      "bg-amber-100 text-amber-700",
    CONFIRMADA:
      "bg-green-100 text-green-700",
    REPROGRAMADA:
      "bg-blue-100 text-blue-700",
    CANCELADA:
      "bg-red-100 text-red-700",
    ATENDIDA:
      "bg-purple-100 text-purple-700",
    NO_ASISTIO:
      "bg-slate-100 text-slate-600",
  };

  return clases[estado];
}

export default function CitasEmpleadoPage() {
  const navigate = useNavigate();

  const citas = useCitaStore(
    (state) => state.citas,
  );

  const loading = useCitaStore(
    (state) => state.loading,
  );

  const error = useCitaStore(
    (state) => state.error,
  );

  const getAll = useCitaStore(
    (state) => state.getAll,
  );

  const clearError = useCitaStore(
    (state) => state.clearError,
  );

  const [busqueda, setBusqueda] =
    useState("");

  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState<EstadoCita | "TODAS">("TODAS");

  useEffect(() => {
    void getAll();
  }, [getAll]);

  const citasFiltradas = useMemo(() => {
    const termino = busqueda
      .trim()
      .toLowerCase();

    return citas.filter((cita) => {
      const coincideEstado =
        estadoSeleccionado === "TODAS" ||
        cita.estado === estadoSeleccionado;

      const coincideBusqueda =
        !termino ||
        cita.vehiculo_placa
          .toLowerCase()
          .includes(termino) ||
        cita.servicio_nombre
          .toLowerCase()
          .includes(termino) ||
        cita.motivo
          .toLowerCase()
          .includes(termino) ||
        cita.estado_display
          .toLowerCase()
          .includes(termino);

      return coincideEstado && coincideBusqueda;
    });
  }, [
    busqueda,
    citas,
    estadoSeleccionado,
  ]);

  const handleVerDetalle = (
    id: number,
  ): void => {
    navigate(`/empleado/citas/${id}`);
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Gestión de Citas
        </h1>

        <p className="mt-1 text-sm text-slate-600">
          Administra las citas solicitadas por
          los clientes del taller.
        </p>
      </header>

      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1fr_240px]">
          <div>
            <label
              htmlFor="buscar-cita-empleado"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Buscar cita
            </label>

            <input
              id="buscar-cita-empleado"
              type="search"
              value={busqueda}
              placeholder="Buscar por placa, servicio, motivo o estado"
              onChange={(event) => {
                setBusqueda(event.target.value);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="filtro-estado-cita"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Estado
            </label>

            <select
              id="filtro-estado-cita"
              value={estadoSeleccionado}
              onChange={(event) => {
                setEstadoSeleccionado(
                  event.target.value as
                    | EstadoCita
                    | "TODAS",
                );
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="TODAS">
                Todas
              </option>

              <option value="SOLICITADA">
                Solicitadas
              </option>

              <option value="CONFIRMADA">
                Confirmadas
              </option>

              <option value="REPROGRAMADA">
                Reprogramadas
              </option>

              <option value="CANCELADA">
                Canceladas
              </option>

              <option value="ATENDIDA">
                Atendidas
              </option>

              <option value="NO_ASISTIO">
                No asistió
              </option>
            </select>
          </div>
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

      {loading && citas.length === 0 && (
        <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 shadow-sm">
          Cargando citas...
        </p>
      )}

      {!loading &&
        citasFiltradas.length === 0 && (
          <section className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              No se encontraron citas
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              No existen registros que coincidan
              con la búsqueda o el estado
              seleccionado.
            </p>
          </section>
        )}

      {!loading &&
        citasFiltradas.length > 0 && (
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-sm text-slate-600">
                Citas encontradas:{" "}
                <span className="font-semibold text-slate-900">
                  {citasFiltradas.length}
                </span>
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Cita
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Vehículo
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Servicio
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Fecha solicitada
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Motivo
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
                  {citasFiltradas.map(
                    (cita: Cita) => (
                      <tr
                        key={cita.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900">
                          #{cita.id}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900">
                          {cita.vehiculo_placa}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                          {cita.servicio_nombre}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                          {formatearFecha(
                            cita.fecha_solicitada,
                          )}
                        </td>

                        <td className="max-w-xs px-4 py-4 text-sm text-slate-700">
                          <p className="line-clamp-2">
                            {cita.motivo}
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${obtenerClaseEstado(
                              cita.estado,
                            )}`}
                          >
                            {cita.estado_display}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4">
                          <button
                            type="button"
                            onClick={() => {
                              handleVerDetalle(
                                cita.id,
                              );
                            }}
                            className="rounded-lg border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                          >
                            Ver detalle
                          </button>
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