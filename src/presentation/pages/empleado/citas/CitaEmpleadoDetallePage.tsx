// src/presentation/pages/empleado/citas/CitaEmpleadoDetallePage.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import type {
  EstadoCita,
  ResponderCitaData,
} from "@/domain/entities/cita.entity";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CrearOrdenTrabajoDialog from "./components/CrearOrdenTrabajoDialog";

import { useCitaStore } from "@/presentation/store/cita.store";

type TipoRespuesta =
  | "CONFIRMAR"
  | "REPROGRAMAR";

function formatearFecha(
  fecha: string,
): string {
  const fechaConvertida =
    new Date(fecha);

  if (
    Number.isNaN(
      fechaConvertida.getTime(),
    )
  ) {
    return fecha;
  }

  return new Intl.DateTimeFormat(
    "es-EC",
    {
      dateStyle: "long",
      timeStyle: "short",
    },
  ).format(fechaConvertida);
}

function obtenerClaseEstado(
  estado: EstadoCita,
): string {
  const clases: Record<
    EstadoCita,
    string
  > = {
    SOLICITADA:
      "border border-amber-200 bg-amber-100 text-amber-700",

    CONFIRMADA:
      "border border-green-200 bg-green-100 text-green-700",

    REPROGRAMADA:
      "border border-blue-200 bg-blue-100 text-blue-700",

    CANCELADA:
      "border border-red-200 bg-red-100 text-red-700",

    ATENDIDA:
      "border border-purple-200 bg-purple-100 text-purple-700",

    NO_ASISTIO:
      "border border-slate-200 bg-slate-100 text-slate-600",
  };

  return clases[estado];
}

function convertirFechaParaInput(
  fecha: string,
): string {
  const fechaConvertida =
    new Date(fecha);

  if (
    Number.isNaN(
      fechaConvertida.getTime(),
    )
  ) {
    return "";
  }

  const diferenciaZonaHoraria =
    fechaConvertida.getTimezoneOffset() *
    60_000;

  return new Date(
    fechaConvertida.getTime() -
      diferenciaZonaHoraria,
  )
    .toISOString()
    .slice(0, 16);
}

export default function CitaEmpleadoDetallePage() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const cita = useCitaStore(
    (state) => state.cita,
  );

  const loading = useCitaStore(
    (state) => state.loading,
  );

  const error = useCitaStore(
    (state) => state.error,
  );

  const getById = useCitaStore(
    (state) => state.getById,
  );

  const responderCita = useCitaStore(
    (state) => state.responderCita,
  );

  const clearCita = useCitaStore(
    (state) => state.clearCita,
  );

  const clearError = useCitaStore(
    (state) => state.clearError,
  );

  const registrarAsistencia = useCitaStore(
  (state) => state.registrarAsistencia,
  );

  const [
    tipoRespuesta,
    setTipoRespuesta,
  ] = useState<TipoRespuesta | null>(
    null,
  );

  const [
    respuestaTaller,
    setRespuestaTaller,
  ] = useState("");

  const [
    nuevaFecha,
    setNuevaFecha,
  ] = useState("");

  const [
    errorFormulario,
    setErrorFormulario,
  ] = useState<string | null>(
    null,
  );

  const [
    modalAsistenciaAbierto,
    setModalAsistenciaAbierto,
  ] = useState(false);

  const [
    procesandoAsistencia,
    setProcesandoAsistencia,
  ] = useState(false);

  const [
    errorAsistencia,
    setErrorAsistencia,
  ] = useState<string | null>(null);

  const [
    modalOrdenAbierto,
    setModalOrdenAbierto,
  ] = useState(false);
    useEffect(() => {
      const citaId = Number(id);

    if (
      !id ||
      Number.isNaN(citaId) ||
      citaId <= 0
    ) {
      return;
    }

    void getById(citaId);

    return () => {
      clearCita();
    };
  }, [
    clearCita,
    getById,
    id,
  ]);

  const citaId = Number(id);

  const idInvalido =
    !id ||
    Number.isNaN(citaId) ||
    citaId <= 0;

  const puedeConfirmar =
    cita?.estado === "SOLICITADA" ||
    cita?.estado === "REPROGRAMADA";

  const puedeReprogramar =
    cita?.estado === "SOLICITADA" ||
    cita?.estado === "CONFIRMADA" ||
    cita?.estado === "REPROGRAMADA";

  const puedeRegistrarAsistencia =
  cita?.estado === "CONFIRMADA" ||
  cita?.estado === "REPROGRAMADA";

  const handleVolver = (): void => {
    navigate("/empleado/citas");
  };

  const cerrarFormulario =
    (): void => {
      setTipoRespuesta(null);
      setRespuestaTaller("");
      setNuevaFecha("");
      setErrorFormulario(null);
      clearError();
    };

  const abrirConfirmacion =
    (): void => {
      setTipoRespuesta("CONFIRMAR");

      setRespuestaTaller(
        "Su cita ha sido confirmada por el taller.",
      );

      setNuevaFecha("");
      setErrorFormulario(null);
      clearError();
    };

  const abrirReprogramacion =
    (): void => {
      setTipoRespuesta(
        "REPROGRAMAR",
      );

      setRespuestaTaller(
        "El taller propone una nueva fecha para su cita.",
      );

      setNuevaFecha(
        cita
          ? convertirFechaParaInput(
              cita.fecha_solicitada,
            )
          : "",
      );

      setErrorFormulario(null);
      clearError();
    };

  const handleResponder =
    async (): Promise<void> => {
      if (!cita || !tipoRespuesta) {
        return;
      }

      const respuestaLimpia =
        respuestaTaller.trim();

      if (!respuestaLimpia) {
        setErrorFormulario(
          "La respuesta del taller es obligatoria.",
        );

        return;
      }

      let data: ResponderCitaData;

      if (
        tipoRespuesta ===
        "CONFIRMAR"
      ) {
        data = {
          estado: "CONFIRMADA",
          respuesta_taller:
            respuestaLimpia,
        };
      } else {
        if (!nuevaFecha) {
          setErrorFormulario(
            "Debes seleccionar la nueva fecha de la cita.",
          );

          return;
        }

        const fechaConvertida =
          new Date(nuevaFecha);

        if (
          Number.isNaN(
            fechaConvertida.getTime(),
          )
        ) {
          setErrorFormulario(
            "La fecha seleccionada no es válida.",
          );

          return;
        }

        if (
          fechaConvertida.getTime() <=
          Date.now()
        ) {
          setErrorFormulario(
            "La nueva fecha debe ser posterior a la fecha actual.",
          );

          return;
        }

        data = {
          estado: "REPROGRAMADA",

          fecha_solicitada:
            fechaConvertida.toISOString(),

          respuesta_taller:
            respuestaLimpia,
        };
      }

      setErrorFormulario(null);

      try {
        await responderCita(
          cita.id,
          data,
        );

        cerrarFormulario();
      } catch {
        // El error se guarda en cita.store.ts.
      }
    };

  const handleRegistrarAsistencia =
  async (
    asistio: boolean,
  ): Promise<void> => {

    if (!cita) {
      return;
    }

    setProcesandoAsistencia(true);
    setErrorAsistencia(null);

    try {

      await registrarAsistencia(
        cita.id,
        {
          asistio,
        },
      );

      setModalAsistenciaAbierto(false);

    } catch (error) {

      const mensaje =
        error instanceof Error
          ? error.message
          : "No se pudo registrar la asistencia.";

      setErrorAsistencia(mensaje);

    } finally {

      setProcesandoAsistencia(false);

    }

  };  

  if (idInvalido) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h1 className="text-xl font-bold text-red-800">
            Identificador inválido
          </h1>

          <p className="mt-2 text-sm text-red-700">
            No fue posible identificar
            la cita solicitada.
          </p>

          <button
            type="button"
            onClick={handleVolver}
            className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Volver a citas
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Gestión de citas
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Detalle de la cita
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Consulta y responde la
            solicitud enviada por el
            cliente.
          </p>
        </div>

        <button
          type="button"
          onClick={handleVolver}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Volver
        </button>
      </header>

      {error && !cita && (
        <section
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5"
        >
          <h2 className="font-semibold text-red-800">
            No se pudo cargar la cita
          </h2>

          <p className="mt-1 text-sm text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={() => {
              clearError();
              void getById(citaId);
            }}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Reintentar
          </button>
        </section>
      )}

      {loading && !cita && (
        <section className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-600">
            Cargando información de la
            cita...
          </p>
        </section>
      )}

      {cita && (
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Número de cita
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Cita #{cita.id}
                </h2>
              </div>

              <span
                className={`inline-flex w-fit rounded-full px-3 py-1.5 text-sm font-semibold ${obtenerClaseEstado(
                  cita.estado,
                )}`}
              >
                {cita.estado_display}
              </span>
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Vehículo
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {cita.vehiculo_placa}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Servicio solicitado
                </p>

                <p className="mt-1 text-sm text-slate-900">
                  {cita.servicio_nombre}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Fecha solicitada
                </p>

                <p className="mt-1 text-sm text-slate-900">
                  {formatearFecha(
                    cita.fecha_solicitada,
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Estado actual
                </p>

                <p className="mt-1 text-sm text-slate-900">
                  {cita.estado_display}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Información de la solicitud
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Motivo
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {cita.motivo}
                </p>
              </div>

              {cita.observaciones_cliente && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Observaciones
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {cita.observaciones_cliente}
                  </p>
                </div>
              )}
            </div>
          </section>

          {cita.respuesta_taller && (
            <section className="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-blue-900">
                Respuesta del taller
              </h2>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-blue-800">
                {cita.respuesta_taller}
              </p>
            </section>
          )}

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Acciones de la cita
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Selecciona la respuesta que
              deseas enviar al cliente.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {puedeConfirmar && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={
                    abrirConfirmacion
                  }
                  className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Confirmar cita
                </button>
              )}

              {puedeReprogramar && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={
                    abrirReprogramacion
                  }
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reprogramar
                </button>
              )}

              {puedeRegistrarAsistencia && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setErrorAsistencia(null);
                    clearError();

                    setModalAsistenciaAbierto(
                      true,
                    );
                  }}
                  className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Registrar asistencia
                </button>
              )}

              {cita.estado === "ATENDIDA" && (
                <button
                  type="button"
                  onClick={() => {
                    setModalOrdenAbierto(
                      true,
                    );
                  }}
                  className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Crear Orden de Trabajo
                </button>
              )}

              {(cita.estado ===
                "CANCELADA" ||
                cita.estado ===
                  "NO_ASISTIO") && (
                <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">
                  Esta cita no tiene
                  acciones pendientes.
                </p>
              )}
            </div>
          </section>
        </div>
      )}

      {tipoRespuesta && cita && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              cerrarFormulario();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-responder-cita"
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
          >
            <header>
              <h2
                id="titulo-responder-cita"
                className="text-xl font-bold text-slate-900"
              >
                {tipoRespuesta ===
                "CONFIRMAR"
                  ? "Confirmar cita"
                  : "Reprogramar cita"}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {tipoRespuesta ===
                "CONFIRMAR"
                  ? "Confirma la solicitud y envía una respuesta al cliente."
                  : "Selecciona la nueva fecha y explica el cambio al cliente."}
              </p>
            </header>

            <div className="mt-6 space-y-5">
              {tipoRespuesta ===
                "REPROGRAMAR" && (
                <div>
                  <label
                    htmlFor="nueva-fecha-cita"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Nueva fecha y hora
                  </label>

                  <input
                    id="nueva-fecha-cita"
                    type="datetime-local"
                    value={nuevaFecha}
                    disabled={loading}
                    onChange={(event) => {
                      setNuevaFecha(
                        event.target.value,
                      );

                      setErrorFormulario(
                        null,
                      );
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-100"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="respuesta-taller"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Respuesta del taller
                </label>

                <textarea
                  id="respuesta-taller"
                  rows={5}
                  value={respuestaTaller}
                  disabled={loading}
                  placeholder="Escribe el mensaje que recibirá el cliente"
                  onChange={(event) => {
                    setRespuestaTaller(
                      event.target.value,
                    );

                    setErrorFormulario(
                      null,
                    );
                  }}
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-100"
                />

                <p className="mt-1 text-xs text-slate-500">
                  Esta respuesta será visible
                  para el cliente.
                </p>
              </div>

              {errorFormulario && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                >
                  {errorFormulario}
                </p>
              )}

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                >
                  {error}
                </p>
              )}
            </div>

            <footer className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={loading}
                onClick={cerrarFormulario}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Volver
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  void handleResponder();
                }}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  tipoRespuesta ===
                  "CONFIRMAR"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading
                  ? "Guardando..."
                  : tipoRespuesta ===
                      "CONFIRMAR"
                    ? "Confirmar cita"
                    : "Guardar reprogramación"}
              </button>
            </footer>
          </section>
        </div>
      )}
        <Dialog
          open={modalAsistenciaAbierto}
          onOpenChange={(abierto) => {
            if (procesandoAsistencia) {
              return;
            }

            setModalAsistenciaAbierto(
              abierto,
            );

            if (!abierto) {
              setErrorAsistencia(null);
              clearError();
            }
          }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                Registrar asistencia
              </DialogTitle>

              <DialogDescription>
                Indica si el cliente asistió a
                la cita programada.
              </DialogDescription>
            </DialogHeader>

            {cita && (
              <div className="space-y-4">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Vehículo
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {cita.vehiculo_placa}
                    </p>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Servicio
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                      {cita.servicio_nombre}
                    </p>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Fecha
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                      {formatearFecha(
                        cita.fecha_solicitada,
                      )}
                    </p>
                  </div>
                </div>

                {errorAsistencia && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                  >
                    {errorAsistencia}
                  </p>
                )}

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                  >
                    {error}
                  </p>
                )}
              </div>
            )}

            <DialogFooter className="gap-2 sm:gap-2">
              <button
                type="button"
                disabled={procesandoAsistencia}
                onClick={() => {
                  setModalAsistenciaAbierto(
                    false,
                  );

                  setErrorAsistencia(null);
                  clearError();
                }}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={procesandoAsistencia}
                onClick={() => {
                  void handleRegistrarAsistencia(
                    false,
                  );
                }}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {procesandoAsistencia
                  ? "Procesando..."
                  : "No asistió"}
              </button>

              <button
                type="button"
                disabled={procesandoAsistencia}
                onClick={() => {
                  void handleRegistrarAsistencia(
                    true,
                  );
                }}
                className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {procesandoAsistencia
                  ? "Procesando..."
                  : "Sí asistió"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {cita && (
        <CrearOrdenTrabajoDialog
          cita={cita}
          open={modalOrdenAbierto}
          onOpenChange={
            setModalOrdenAbierto
          }
          onOrdenCreada={(orden) => {
            navigate(
              `/empleado/ordenes/${orden.id}`,
            );
          }}
        />
      )}
    </main>
  );
}