// src/presentation/pages/citas/CitaDetallePage.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Pencil,
  XCircle,
} from "lucide-react";

import type {
  EstadoCita,
} from "@/domain/entities/cita.entity";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useCitaStore } from "@/presentation/store/cita.store";

function formatearFecha(fecha: string): string {
  const fechaConvertida = new Date(fecha);

  if (Number.isNaN(fechaConvertida.getTime())) {
    return fecha;
  }

  return new Intl.DateTimeFormat("es-EC", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(fechaConvertida);
}

function obtenerClaseEstado(
  estado: EstadoCita,
): string {
  const clases: Record<EstadoCita, string> = {
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

export default function CitaDetallePage() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const [
    dialogoCancelarAbierto,
    setDialogoCancelarAbierto,
  ] = useState(false);

  const [
    motivoCancelacion,
    setMotivoCancelacion,
  ] = useState("");

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

  const clearCita = useCitaStore(
    (state) => state.clearCita,
  );

  const clearError = useCitaStore(
    (state) => state.clearError,
  );

  const cancelarCita = useCitaStore(
    (state) => state.cancelarCita,
  );

  useEffect(() => {
    clearCita();
    clearError();

    const citaId = Number(id);

    if (
      !Number.isInteger(citaId) ||
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
    clearError,
    getById,
    id,
  ]);

  const citaId = Number(id);

  const idEsValido =
    Number.isInteger(citaId) &&
    citaId > 0;

  const puedeCancelar =
    cita?.estado === "SOLICITADA" ||
    cita?.estado === "CONFIRMADA" ||
    cita?.estado === "REPROGRAMADA";

  const puedeEditar =
    cita?.estado === "SOLICITADA" ||
    cita?.estado === "REPROGRAMADA";

  const handleVolver = (): void => {
    navigate("/cliente/citas");
  };

  const handleEditar = (): void => {
    if (!cita) {
      return;
    }

    navigate(
      `/cliente/citas/${cita.id}/editar`,
    );
  };

  const handleAbrirCancelacion = (): void => {
    clearError();
    setDialogoCancelarAbierto(true);
  };

  const handleCancelar = async (): Promise<void> => {
    if (!cita) {
      return;
    }

    try {
      await cancelarCita(
        cita.id,
        motivoCancelacion.trim(),
      );

      setDialogoCancelarAbierto(false);
      setMotivoCancelacion("");
    } catch {
      // El store guarda el mensaje en error.
    }
  };

  if (!idEsValido) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
          <div className="border-b border-red-200 bg-red-50 p-5 sm:p-6">
            <h1 className="text-xl font-bold text-red-800">
              Identificador no válido
            </h1>

            <p className="mt-2 text-sm leading-6 text-red-700">
              No se pudo identificar la cita
              solicitada.
            </p>
          </div>

          <div className="p-5 sm:p-6">
            <Button
              type="button"
              onClick={handleVolver}
              className="bg-blue-600 text-white shadow-sm hover:bg-blue-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />

              Volver a citas
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Detalle de la cita
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Consulta la información registrada de la
            cita.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={handleVolver}
            className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />

            Volver
          </Button>

          {puedeEditar && (
            <Button
              type="button"
              onClick={handleEditar}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Pencil className="mr-2 h-4 w-4" />

              Editar
            </Button>
          )}
        </div>
      </header>

      {loading && !cita && (
        <section className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-sm font-medium text-slate-600">
            Cargando información de la cita...
          </p>
        </section>
      )}

      {error && !loading && !cita && (
        <section
          role="alert"
          className="overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm"
        >
          <div className="border-b border-red-200 bg-red-50 p-5">
            <h2 className="font-semibold text-red-800">
              No se pudo cargar la cita
            </h2>

            <p className="mt-2 text-sm leading-6 text-red-700">
              {error}
            </p>
          </div>

          <div className="p-5">
            <Button
              type="button"
              variant="outline"
              onClick={handleVolver}
              className="border-red-300 bg-white text-red-700 hover:bg-red-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />

              Volver a citas
            </Button>
          </div>
        </section>
      )}

      {cita && (
        <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Información registrada
              </p>

              <CardTitle className="mt-1 text-xl text-slate-900 sm:text-2xl">
                Cita #{cita.id}
              </CardTitle>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold ${obtenerClaseEstado(
                  cita.estado,
                )}`}
              >
                {cita.estado_display}
              </span>

              {puedeCancelar && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={handleAbrirCancelacion}
                  className="border-red-300 bg-white text-red-700 hover:bg-red-50 hover:text-red-800"
                >
                  <XCircle className="mr-2 h-4 w-4" />

                  Cancelar cita
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-5 sm:p-6">
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
                <dt className="text-sm font-medium text-slate-500">
                  Cliente
                </dt>

                <dd className="mt-1 break-words text-sm font-semibold text-slate-900">
                  {cita.cliente_nombre}
                </dd>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
                <dt className="text-sm font-medium text-slate-500">
                  Vehículo
                </dt>

                <dd className="mt-1 text-sm font-semibold uppercase tracking-wide text-slate-900">
                  {cita.vehiculo_placa}
                </dd>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
                <dt className="text-sm font-medium text-slate-500">
                  Servicio
                </dt>

                <dd className="mt-1 break-words text-sm font-semibold text-slate-900">
                  {cita.servicio_nombre}
                </dd>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
                <dt className="text-sm font-medium text-slate-500">
                  Fecha solicitada
                </dt>

                <dd className="mt-1 text-sm font-semibold capitalize text-slate-900">
                  {formatearFecha(
                    cita.fecha_solicitada,
                  )}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-semibold text-slate-700">
                  Motivo
                </dt>

                <dd className="mt-2 whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {cita.motivo}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-semibold text-slate-700">
                  Observaciones del cliente
                </dt>

                <dd className="mt-2 whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {cita.observaciones_cliente ||
                    "Sin observaciones adicionales."}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-semibold text-slate-700">
                  Respuesta del taller
                </dt>

                <dd className="mt-2 whitespace-pre-wrap rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
                  {cita.respuesta_taller ||
                    "El taller aún no ha registrado una respuesta."}
                </dd>
              </div>

              {cita.estado === "CANCELADA" && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-semibold text-red-700">
                    Motivo de cancelación
                  </dt>

                  <dd className="mt-2 whitespace-pre-wrap rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
                    {cita.motivo_cancelacion ||
                      "No se registró un motivo de cancelación."}
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      )}

      <AlertDialog
        open={dialogoCancelarAbierto}
        onOpenChange={(open) => {
          if (loading) {
            return;
          }

          setDialogoCancelarAbierto(open);

          if (!open) {
            setMotivoCancelacion("");
            clearError();
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Cancelar cita
            </AlertDialogTitle>

            <AlertDialogDescription>
              La cita no será eliminada. Permanecerá
              registrada con el estado Cancelada.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-2">
            <label
              htmlFor="motivo-cancelacion"
              className="text-sm font-medium text-slate-700"
            >
              Motivo de la cancelación
            </label>

            <Textarea
              id="motivo-cancelacion"
              value={motivoCancelacion}
              disabled={loading}
              placeholder="Escribe el motivo de la cancelación"
              onChange={(event) => {
                setMotivoCancelacion(
                  event.target.value,
                );
              }}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={loading}
            >
              Volver
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={loading}
              onClick={(event) => {
                event.preventDefault();
                void handleCancelar();
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {loading
                ? "Cancelando..."
                : "Confirmar cancelación"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}