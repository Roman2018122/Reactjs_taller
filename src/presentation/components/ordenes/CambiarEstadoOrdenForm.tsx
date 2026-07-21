import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  CheckCircle2,
  Loader2,
  RefreshCw,
} from "lucide-react";

import type {
  EstadoOrdenTrabajo,
  OrdenTrabajo,
} from "@/domain/entities/orden-trabajo.entity";

import {
  useOrdenTrabajoStore,
} from "@/presentation/store/orden-trabajo.store";

import {
  esEstadoOrdenFinal,
  getSiguientesEstados,
} from "@/presentation/utils/orden-trabajo-status";

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
  Label,
} from "@/presentation/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CambiarEstadoOrdenFormProps {
  orden: OrdenTrabajo;
}

export default function CambiarEstadoOrdenForm({
  orden,
}: CambiarEstadoOrdenFormProps) {
  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState<EstadoOrdenTrabajo | "">("");

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const updatingEstado =
    useOrdenTrabajoStore(
      (state) => state.updatingEstado,
    );

  const error =
    useOrdenTrabajoStore(
      (state) => state.error,
    );

  const updateEstado =
    useOrdenTrabajoStore(
      (state) => state.updateEstado,
    );

  const siguientesEstados =
    getSiguientesEstados(
      orden.estado,
    );

  const estadoFinal =
    esEstadoOrdenFinal(
      orden.estado,
    );

  useEffect(() => {
    setEstadoSeleccionado("");
    setSuccessMessage(null);
  }, [
    orden.id,
    orden.estado,
  ]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!estadoSeleccionado) {
      return;
    }

    try {
      const ordenActualizada =
        await updateEstado(
          orden.id,
          estadoSeleccionado,
        );

      setEstadoSeleccionado("");

      setSuccessMessage(
        `El estado se actualizó a "${ordenActualizada.estado_display}".`,
      );
    } catch {
      setSuccessMessage(null);
    }
  };

  return (
    <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <RefreshCw className="h-5 w-5" />
          </div>

          <div>
            <CardTitle className="text-xl font-bold text-slate-900">
              Actualizar estado
            </CardTitle>

            <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
              Registra el avance actual de la orden
              de trabajo.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6">
        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-500">
            Estado actual
          </p>

          <Badge
            variant="outline"
            className="mt-2 bg-white px-3 py-1 text-sm font-semibold text-slate-700"
          >
            {orden.estado_display}
          </Badge>
        </div>

        {estadoFinal ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold text-emerald-900">
                  Orden finalizada
                </p>

                <p className="mt-1 text-sm leading-6 text-emerald-800">
                  Una orden entregada o cancelada
                  no puede cambiar nuevamente de
                  estado.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form
            className="space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <Label
                htmlFor="nuevo-estado"
                className="text-sm font-semibold text-slate-700"
              >
                Nuevo estado
              </Label>
              <Select
                    value={estadoSeleccionado}
                    disabled={updatingEstado}
                    onValueChange={(value) => {
                      setEstadoSeleccionado(
                        value as EstadoOrdenTrabajo,
                      );

                      setSuccessMessage(null);
                    }}
                  >
                    <SelectTrigger
                      id="nuevo-estado"
                      className="h-11 w-full border-slate-300 bg-white text-slate-900 focus:ring-blue-500/20"
                    >
                      <SelectValue placeholder="Selecciona el siguiente estado" />
                    </SelectTrigger>

                    <SelectContent
                      position="popper"
                      className="z-[100] max-h-60 min-w-[var(--radix-select-trigger-width)] overflow-y-auto border-slate-200 bg-white shadow-lg"
                    >
                      {siguientesEstados.map(
                        (estado) => (
                          <SelectItem
                            key={estado.value}
                            value={estado.value}
                            className="cursor-pointer py-2.5 text-slate-700 focus:bg-blue-50 focus:text-blue-700"
                          >
                            {estado.label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>

              <p className="text-xs leading-5 text-slate-500">
                Solo se muestran los estados permitidos
                para continuar el proceso.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </div>
            )}

            {successMessage && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

                  <p>
                    {successMessage}
                  </p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={
                updatingEstado ||
                !estadoSeleccionado
              }
              className="w-full bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-700 sm:w-auto"
            >
              {updatingEstado ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Actualizar estado
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}