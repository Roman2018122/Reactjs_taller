import CambiarEstadoOrdenForm from "@/presentation/components/ordenes/CambiarEstadoOrdenForm";
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

export default function OrdenTrabajoEmpleadoDetallePage() {
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
              "/empleado/ordenes",
            );
          }}
          className="border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
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
              No se pudo identificar la orden
              solicitada.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[420px] w-full max-w-4xl items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white px-10 py-12 text-slate-600 shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

          <span className="text-sm font-medium">
            Cargando orden de trabajo...
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
              "/empleado/ordenes",
            );
          }}
          className="border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
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
              "/empleado/ordenes",
            );
          }}
          className="border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>

        <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
          <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <ClipboardList className="h-7 w-7" />
            </div>

            <p className="font-semibold text-slate-900">
              Orden no encontrada.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
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
                Información general y seguimiento
                de la orden de trabajo.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              navigate(
                "/empleado/ordenes",
              );
            }}
            className="shrink-0 border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a órdenes
          </Button>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
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

        <Card className="border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UserRound className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Cliente
              </p>

              <p className="mt-1 truncate font-semibold text-slate-900">
                {orden.cliente_nombre}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Wrench className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Responsable
              </p>

              <p className="mt-1 truncate font-semibold text-slate-900">
                {
                  orden.empleado_responsable_nombre ??
                  "Sin asignar"
                }
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
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
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
            <CardTitle className="text-xl font-bold text-slate-900">
              Información de recepción
            </CardTitle>

            <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
              Datos registrados al recibir
              el vehículo.
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
                  "Sin observaciones registradas."
                }
              </p>
            </div>

            <Separator className="bg-slate-200" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                  <Gauge className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Kilometraje
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

              <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                  <UserRound className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Recibido por
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {
                      orden.empleado_recepciona_nombre
                    }
                  </p>
                </div>
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
              Fechas importantes del proceso
              de mantenimiento.
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

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">
                Cita relacionada
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {
                  orden.cita !== null
                    ? `Cita #${orden.cita}`
                    : "Orden creada sin cita asociada"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
          <CardTitle className="text-xl font-bold text-slate-900">
            Valores de la orden
          </CardTitle>

          <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
            Resumen económico de los servicios
            registrados.
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
      <CambiarEstadoOrdenForm
        orden={orden}
      />

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
          <CardTitle className="text-xl font-bold text-slate-900">
            Historial de estados
          </CardTitle>

          <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
            Seguimiento de los cambios realizados
            durante el proceso.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          {
            orden.historial_estados.length ===
            0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Clock3 className="h-6 w-6" />
                </div>

                <p className="text-sm font-medium text-slate-600">
                  No existen estados registrados.
                </p>
              </div>
            ) : (
              <div className="space-y-0">
                {orden.historial_estados.map(
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
                          orden
                            .historial_estados
                            .length -
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

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-3 text-xs text-slate-500">
                          <span>
                            {formatDateTime(
                              historial.creado_en,
                            )}
                          </span>

                          <span>
                            Empleado:{" "}
                            {
                              historial.empleado_nombre ??
                              "No registrado"
                            }
                          </span>

                          <span>
                            Visible para cliente:{" "}
                            {
                              historial.visible_cliente
                                ? "Sí"
                                : "No"
                            }
                          </span>
                        </div>
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
            Servicios de la orden
          </CardTitle>

          <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
            Servicios asociados y valores
            registrados.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {
            orden.detalles_servicios.length ===
            0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Wrench className="h-6 w-6" />
                </div>

                <p className="text-sm font-medium text-slate-600">
                  Esta orden todavía no tiene servicios
                  registrados.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
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
                        Empleado
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
                      orden.detalles_servicios.map(
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

                            <TableCell className="max-w-[260px] whitespace-normal px-5 py-4 leading-6 text-slate-600">
                              {
                                detalle.descripcion
                              }
                            </TableCell>

                            <TableCell className="px-5 py-4 text-slate-700">
                              {
                                detalle.empleado_nombre ??
                                "Sin asignar"
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
            )
          }
        </CardContent>
      </Card>
    </main>
  );
}

