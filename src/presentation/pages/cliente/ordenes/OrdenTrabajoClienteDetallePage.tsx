
import {
  useEffect,
} from "react";

import {
  ArrowLeft,
  CalendarDays,
  Car,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Gauge,
  Loader2,
  UserRound,
  Wrench,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import type {
  EstadoOrdenTrabajo,
} from "@/domain/entities/orden-trabajo.entity";

import {
  useOrdenTrabajoStore,
} from "@/presentation/store/orden-trabajo.store";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/presentation/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";

import {
  Separator,
} from "@/components/ui/separator";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function formatDate(
  value: string | null,
): string {
  if (!value) {
    return "No registrada";
  }

  return new Intl.DateTimeFormat(
    "es-EC",
    {
      year: "numeric",
      month: "long",
      day: "2-digit",
    },
  ).format(new Date(value));
}

function formatDateTime(
  value: string | null,
): string {
  if (!value) {
    return "No registrada";
  }

  return new Intl.DateTimeFormat(
    "es-EC",
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(new Date(value));
}

function formatCurrency(
  value: string,
): string {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return value;
  }

  return new Intl.NumberFormat(
    "es-EC",
    {
      style: "currency",
      currency: "USD",
    },
  ).format(numericValue);
}

function getEstadoBadgeVariant(
  estado: EstadoOrdenTrabajo,
):
  | "default"
  | "secondary"
  | "destructive"
  | "outline" {
  switch (estado) {
    case "ENTREGADO":
      return "default";

    case "CANCELADO":
      return "destructive";

    case "RECIBIDO":
    case "LISTO":
      return "secondary";

    default:
      return "outline";
  }
}

function getEstadoMessage(
  estado: EstadoOrdenTrabajo,
): string {
  switch (estado) {
    case "RECIBIDO":
      return "Tu vehículo fue recibido por el taller.";

    case "EN_REVISION":
      return "Tu vehículo está siendo revisado por el personal del taller.";

    case "ESPERANDO_AUTORIZACION":
      return "El taller está esperando tu autorización para continuar.";

    case "EN_REPARACION":
      return "Los trabajos autorizados se encuentran en ejecución.";

    case "EN_LAVADO":
      return "Tu vehículo está en la etapa de lavado y preparación.";

    case "LISTO":
      return "Tu vehículo está listo para ser retirado.";

    case "ENTREGADO":
      return "El vehículo fue entregado y la orden está finalizada.";

    case "CANCELADO":
      return "La orden de trabajo fue cancelada.";

    default:
      return "Consulta el seguimiento de tu orden de trabajo.";
  }
}

export default function OrdenTrabajoClienteDetallePage() {
  const navigate = useNavigate();

  const {
    id,
  } = useParams();

  const orden =
    useOrdenTrabajoStore(
      (state) => state.orden,
    );

  const loading =
    useOrdenTrabajoStore(
      (state) => state.loading,
    );

  const error =
    useOrdenTrabajoStore(
      (state) => state.error,
    );

  const getById =
    useOrdenTrabajoStore(
      (state) => state.getById,
    );

  const clearOrden =
    useOrdenTrabajoStore(
      (state) => state.clearOrden,
    );

  const ordenId = Number(id);

  useEffect(() => {
    if (
      Number.isInteger(ordenId) &&
      ordenId > 0
    ) {
      void getById(ordenId);
    }

    return () => {
      clearOrden();
    };
  }, [
    ordenId,
    getById,
    clearOrden,
  ]);

  if (
    !Number.isInteger(ordenId) ||
    ordenId <= 0
  ) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            navigate(
              "/cliente/ordenes",
            );
          }}
          className="border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a mis órdenes
        </Button>

        <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
          <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <ClipboardList className="h-7 w-7" />
            </div>

            <p className="font-semibold text-slate-900">
              Identificador de orden inválido.
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              No se pudo identificar la orden solicitada.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-[420px] w-full items-center justify-center px-4 py-6">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white px-10 py-12 text-center shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

          <span className="text-sm font-medium text-slate-600">
            Cargando seguimiento de la orden...
          </span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            navigate(
              "/cliente/ordenes",
            );
          }}
          className="border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a mis órdenes
        </Button>

        <Card className="overflow-hidden border-red-200 bg-white shadow-sm">
          <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <ClipboardList className="h-7 w-7" />
            </div>

            <p className="font-semibold text-red-700">
              No se pudo cargar la orden.
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
              {error}
            </p>

            <Button
              type="button"
              className="mt-5 bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-700"
              onClick={() => {
                void getById(ordenId);
              }}
            >
              Intentar nuevamente
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!orden) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            navigate(
              "/cliente/ordenes",
            );
          }}
          className="border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a mis órdenes
        </Button>

        <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
          <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <ClipboardList className="h-7 w-7" />
            </div>

            <p className="font-semibold text-slate-900">
              Orden no encontrada.
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              La orden no existe o no pertenece a uno de tus vehículos.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const historialVisible =
    orden.historial_estados.filter(
      (historial) =>
        historial.visible_cliente,
    );

  const serviciosVisibles =
    orden.detalles_servicios.filter(
      (detalle) =>
        detalle.visible_cliente,
    );

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="relative p-5 sm:p-6">
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-50" />
          <div className="absolute -bottom-14 right-20 h-28 w-28 rounded-full bg-slate-50" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <ClipboardList className="h-6 w-6" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {orden.numero_orden}
                  </h1>

                  <Badge
                    variant={
                      getEstadoBadgeVariant(
                        orden.estado,
                      )
                    }
                    className="whitespace-nowrap"
                  >
                    {orden.estado_display}
                  </Badge>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Seguimiento del trabajo realizado en tu vehículo.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                navigate(
                  "/cliente/ordenes",
                );
              }}
              className="relative shrink-0 border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a mis órdenes
            </Button>
          </div>
        </div>
      </header>

      <Card className="overflow-hidden border-blue-200 bg-blue-50/60 shadow-sm">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
              <Wrench className="h-5 w-5" />
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                Estado actual
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {getEstadoMessage(
                  orden.estado,
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="group border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
              <Car className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Vehículo
              </p>

              <p className="mt-1 truncate font-semibold uppercase tracking-wide text-slate-900">
                {orden.vehiculo_placa}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="group border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
              <UserRound className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Responsable
              </p>

              <p className="mt-1 truncate font-semibold text-slate-900">
                {
                  orden.empleado_responsable_nombre ??
                  "Pendiente de asignación"
                }
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="group border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Entrega estimada
              </p>

              <p className="mt-1 truncate font-semibold text-slate-900">
                {formatDate(
                  orden.fecha_estimada_entrega,
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="group border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CircleDollarSign className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Total
              </p>

              <p className="mt-1 truncate text-lg font-bold text-slate-900">
                {formatCurrency(
                  orden.total,
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
            <CardTitle className="text-xl font-bold text-slate-900">
              Información del vehículo
            </CardTitle>

            <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
              Datos registrados cuando el vehículo ingresó al taller.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 p-5 sm:p-6">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Motivo de ingreso
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {orden.motivo_ingreso}
              </p>
            </div>

            <Separator className="bg-slate-200" />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Observaciones de recepción
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                {
                  orden.observaciones_recepcion ??
                  "No se registraron observaciones."
                }
              </p>
            </div>

            <Separator className="bg-slate-200" />

            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <Gauge className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Kilometraje de ingreso
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {
                    orden.kilometraje_ingreso !==
                    null
                      ? `${orden.kilometraje_ingreso.toLocaleString(
                          "es-EC",
                        )} km`
                      : "No registrado"
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
            <CardTitle className="text-xl font-bold text-slate-900">
              Fechas de la orden
            </CardTitle>

            <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
              Fechas importantes relacionadas con el trabajo.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Clock3 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Fecha de ingreso
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {formatDateTime(
                    orden.fecha_ingreso,
                  )}
                </p>
              </div>
            </div>

            <Separator className="bg-slate-200" />

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Entrega estimada
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {formatDate(
                    orden.fecha_estimada_entrega,
                  )}
                </p>
              </div>
            </div>

            <Separator className="bg-slate-200" />

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Fecha de entrega
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {formatDateTime(
                    orden.fecha_entrega,
                  )}
                </p>
              </div>
            </div>

            <Separator className="bg-slate-200" />

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">
                Cita relacionada
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {
                  orden.cita !== null
                    ? `Cita #${orden.cita}`
                    : "No existe una cita asociada"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
          <CardTitle className="text-xl font-bold text-slate-900">
            Valores de la orden
          </CardTitle>

          <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
            Resumen económico de los trabajos registrados.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Subtotal
              </p>

              <p className="mt-2 text-xl font-bold text-slate-900">
                {formatCurrency(
                  orden.subtotal,
                )}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Descuento
              </p>

              <p className="mt-2 text-xl font-bold text-slate-900">
                {formatCurrency(
                  orden.descuento,
                )}
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-medium text-blue-700">
                Total
              </p>

              <p className="mt-2 text-xl font-bold text-blue-900">
                {formatCurrency(
                  orden.total,
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
          <CardTitle className="text-xl font-bold text-slate-900">
            Seguimiento de la orden
          </CardTitle>

          <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
            Cambios de estado visibles durante el proceso.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          {
            historialVisible.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <ClipboardList className="h-7 w-7" />
                </div>

                <p className="font-semibold text-slate-900">
                  Todavía no hay novedades visibles
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Los avances realizados por el taller aparecerán aquí.
                </p>
              </div>
            ) : (
              <div className="space-y-0">
                {historialVisible.map(
                  (
                    historial,
                    index,
                  ) => (
                    <div
                      key={historial.id}
                      className="relative flex gap-4 pb-6 last:pb-0"
                    >
                      {
                        index <
                          historialVisible.length -
                            1 && (
                          <div className="absolute left-[9px] top-5 h-full w-px bg-slate-200" />
                        )
                      }

                      <div className="relative z-10 mt-1 h-5 w-5 shrink-0 rounded-full border-4 border-white bg-blue-600 shadow-sm" />

                      <div className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/40">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900">
                              {historial.titulo}
                            </p>

                            <p className="mt-1 text-sm leading-6 text-slate-600">
                              {
                                historial.descripcion
                              }
                            </p>
                          </div>

                          <Badge
                            variant="outline"
                            className="w-fit shrink-0 bg-white"
                          >
                            {
                              historial.estado_nuevo_display
                            }
                          </Badge>
                        </div>

                        <p className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-500">
                          {formatDateTime(
                            historial.creado_en,
                          )}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )
          }
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
          <CardTitle className="text-xl font-bold text-slate-900">
            Servicios registrados
          </CardTitle>

          <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
            Trabajos visibles asociados a esta orden.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {
            serviciosVisibles.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Wrench className="h-7 w-7" />
                </div>

                <p className="font-semibold text-slate-900">
                  No hay servicios visibles
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Los servicios autorizados o realizados aparecerán aquí.
                </p>
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <Table>
                    <TableHeader className="bg-slate-100">
                      <TableRow className="border-slate-200 hover:bg-slate-100">
                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Servicio
                        </TableHead>

                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Descripción
                        </TableHead>

                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Cantidad
                        </TableHead>

                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Precio
                        </TableHead>

                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Subtotal
                        </TableHead>

                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Estado
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {
                        serviciosVisibles.map(
                          (detalle) => (
                            <TableRow
                              key={detalle.id}
                              className="border-slate-200 transition-colors hover:bg-slate-50"
                            >
                              <TableCell className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900">
                                {
                                  detalle.servicio_nombre
                                }
                              </TableCell>

                              <TableCell className="max-w-[280px] whitespace-normal px-5 py-4 leading-6 text-slate-600">
                                {
                                  detalle.descripcion ||
                                  "Sin descripción"
                                }
                              </TableCell>

                              <TableCell className="whitespace-nowrap px-5 py-4 text-slate-700">
                                {detalle.cantidad}
                              </TableCell>

                              <TableCell className="whitespace-nowrap px-5 py-4 text-slate-700">
                                {formatCurrency(
                                  detalle.precio_unitario,
                                )}
                              </TableCell>

                              <TableCell className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900">
                                {formatCurrency(
                                  detalle.subtotal,
                                )}
                              </TableCell>

                              <TableCell className="whitespace-nowrap px-5 py-4">
                                <Badge
                                  variant="outline"
                                  className="bg-white"
                                >
                                  {
                                    detalle.estado_display
                                  }
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ),
                        )
                      }
                    </TableBody>
                  </Table>
                </div>

                <div className="grid gap-4 p-5 sm:p-6 md:hidden">
                  {serviciosVisibles.map(
                    (detalle) => (
                      <Card
                        key={detalle.id}
                        className="overflow-hidden border-slate-200 bg-white shadow-sm"
                      >
                        <CardHeader className="space-y-3 border-b border-slate-200 bg-slate-50 p-5">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <CardTitle className="text-base font-bold text-slate-900">
                              {
                                detalle.servicio_nombre
                              }
                            </CardTitle>

                            <Badge
                              variant="outline"
                              className="bg-white"
                            >
                              {
                                detalle.estado_display
                              }
                            </Badge>
                          </div>

                          <CardDescription className="text-sm leading-6 text-slate-600">
                            {
                              detalle.descripcion ||
                              "Sin descripción"
                            }
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="p-5">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="rounded-lg bg-slate-50 p-3">
                              <p className="text-slate-500">
                                Cantidad
                              </p>

                              <p className="mt-1 font-semibold text-slate-900">
                                {detalle.cantidad}
                              </p>
                            </div>

                            <div className="rounded-lg bg-slate-50 p-3">
                              <p className="text-slate-500">
                                Precio unitario
                              </p>

                              <p className="mt-1 font-semibold text-slate-900">
                                {formatCurrency(
                                  detalle.precio_unitario,
                                )}
                              </p>
                            </div>

                            <div className="col-span-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
                              <p className="text-blue-700">
                                Subtotal
                              </p>

                              <p className="mt-1 text-lg font-bold text-blue-900">
                                {formatCurrency(
                                  detalle.subtotal,
                                )}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </div>
              </>
            )
          }
        </CardContent>
      </Card>
    </main>
  );
}

