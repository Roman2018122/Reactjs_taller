import {
  useEffect,
  useState,
} from "react";

import type {
  Cita,
  CrearOrdenDesdeCitaData,
} from "@/domain/entities/cita.entity";

import type {
  OrdenTrabajo,
} from "@/domain/entities/orden-trabajo.entity";

import {
  Button,
} from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Textarea,
} from "@/components/ui/textarea";

import {
  useCitaStore,
} from "@/presentation/store/cita.store";

interface CrearOrdenTrabajoDialogProps {
  cita: Cita;
  open: boolean;

  onOpenChange: (
    open: boolean,
  ) => void;

  onOrdenCreada: (
    orden: OrdenTrabajo,
  ) => void;
}

function obtenerFechaActual(): string {
  const fecha = new Date();

  const anio = fecha.getFullYear();

  const mes = String(
    fecha.getMonth() + 1,
  ).padStart(2, "0");

  const dia = String(
    fecha.getDate(),
  ).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

export default function CrearOrdenTrabajoDialog({
  cita,
  open,
  onOpenChange,
  onOrdenCreada,
}: CrearOrdenTrabajoDialogProps) {
  const crearOrden = useCitaStore(
    (state) => state.crearOrden,
  );

  const clearError = useCitaStore(
    (state) => state.clearError,
  );

  const [
    motivoIngreso,
    setMotivoIngreso,
  ] = useState("");

  const [
    observacionesRecepcion,
    setObservacionesRecepcion,
  ] = useState("");

  const [
    kilometrajeIngreso,
    setKilometrajeIngreso,
  ] = useState("");

  const [
    fechaEstimadaEntrega,
    setFechaEstimadaEntrega,
  ] = useState("");

  const [
    procesando,
    setProcesando,
  ] = useState(false);

  const [
    errorFormulario,
    setErrorFormulario,
  ] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    setMotivoIngreso(
      cita.motivo ?? "",
    );

    setObservacionesRecepcion("");
    setKilometrajeIngreso("");
    setFechaEstimadaEntrega("");
    setErrorFormulario(null);

    clearError();
  }, [
    open,
    cita.id,
    cita.motivo,
    clearError,
  ]);

  const handleOpenChange = (
    abierto: boolean,
  ): void => {
    if (procesando) {
      return;
    }

    setErrorFormulario(null);
    onOpenChange(abierto);
  };

  const handleCrearOrden =
    async (): Promise<void> => {
      const motivoLimpio =
        motivoIngreso.trim();

      const observacionesLimpias =
        observacionesRecepcion.trim();

      if (!motivoLimpio) {
        setErrorFormulario(
          "El motivo de ingreso es obligatorio.",
        );

        return;
      }

      let kilometraje:
        | number
        | null = null;

      if (
        kilometrajeIngreso.trim()
      ) {
        kilometraje = Number(
          kilometrajeIngreso,
        );

        if (
          !Number.isInteger(
            kilometraje,
          ) ||
          kilometraje < 0
        ) {
          setErrorFormulario(
            "El kilometraje debe ser un número entero mayor o igual a cero.",
          );

          return;
        }
      }

      if (
        fechaEstimadaEntrega &&
        fechaEstimadaEntrega <
          obtenerFechaActual()
      ) {
        setErrorFormulario(
          "La fecha estimada de entrega no puede ser anterior a la fecha actual.",
        );

        return;
      }

      const data:
        CrearOrdenDesdeCitaData = {
          motivo_ingreso:
            motivoLimpio,

          observaciones_recepcion:
            observacionesLimpias ||
            undefined,

          kilometraje_ingreso:
            kilometraje,

          fecha_estimada_entrega:
            fechaEstimadaEntrega ||
            null,
        };

      setProcesando(true);
      setErrorFormulario(null);
      clearError();

      try {
        const orden =
          await crearOrden(
            cita.id,
            data,
          );

        onOpenChange(false);
        onOrdenCreada(orden);
      } catch (error) {
        const mensaje =
          error instanceof Error
            ? error.message
            : (
                "No se pudo crear la " +
                "orden de trabajo."
              );

        setErrorFormulario(
          mensaje,
        );
      } finally {
        setProcesando(false);
      }
    };

  return (
    <Dialog
      open={open}
      onOpenChange={
        handleOpenChange
      }
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Crear orden de trabajo
          </DialogTitle>

          <DialogDescription>
            Registra la información
            inicial de recepción del
            vehículo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Vehículo
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {cita.vehiculo_placa}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Servicio solicitado
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {cita.servicio_nombre}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivo-ingreso">
              Motivo de ingreso
              <span className="ml-1 text-red-500">
                *
              </span>
            </Label>

            <Textarea
              id="motivo-ingreso"
              rows={3}
              value={motivoIngreso}
              disabled={procesando}
              placeholder=""
              onChange={(event) => {
                setMotivoIngreso(
                  event.target.value,
                );

                setErrorFormulario(
                  null,
                );
              }}
            />

            <p className="text-xs text-slate-500">
              Se carga inicialmente el
              motivo registrado en la
              cita.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observaciones-recepcion">
              Observaciones de recepción
            </Label>

            <Textarea
              id="observaciones-recepcion"
              rows={3}
              value={
                observacionesRecepcion
              }
              disabled={procesando}
              placeholder=""
              onChange={(event) => {
                setObservacionesRecepcion(
                  event.target.value,
                );

                setErrorFormulario(
                  null,
                );
              }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="kilometraje-ingreso">
                Kilometraje de ingreso
              </Label>

              <Input
                id="kilometraje-ingreso"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={
                  kilometrajeIngreso
                }
                disabled={procesando}
                placeholder="KM"
                onChange={(event) => {
                  setKilometrajeIngreso(
                    event.target.value,
                  );

                  setErrorFormulario(
                    null,
                  );
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fecha-estimada-entrega">
                Fecha estimada de entrega
              </Label>

              <Input
                id="fecha-estimada-entrega"
                type="date"
                min={obtenerFechaActual()}
                value={
                  fechaEstimadaEntrega
                }
                disabled={procesando}
                onChange={(event) => {
                  setFechaEstimadaEntrega(
                    event.target.value,
                  );

                  setErrorFormulario(
                    null,
                  );
                }}
              />
            </div>
          </div>

          {errorFormulario && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorFormulario}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={procesando}
            onClick={() => {
              handleOpenChange(false);
            }}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            disabled={procesando}
            onClick={() => {
              void handleCrearOrden();
            }}
          >
            {procesando
              ? "Creando orden..."
              : "Crear orden de trabajo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}