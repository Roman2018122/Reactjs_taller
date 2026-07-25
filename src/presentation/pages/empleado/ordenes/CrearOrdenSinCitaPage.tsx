import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  ClipboardList,
  Loader2,
  Save,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useClienteStore,
} from "@/presentation/store/cliente.store";

import {
  useVehiculoStore,
} from "@/presentation/store/vehiculo.store";

import {
  useOrdenTrabajoStore,
} from "@/presentation/store/orden-trabajo.store";

import type {
  Cliente,
} from "@/domain/entities/cliente.entity";

import type {
  Vehiculo,
} from "@/domain/entities/vehiculo.entity";

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
  Input,
} from "@/presentation/components/ui/input";

import {
  Label,
} from "@/presentation/components/ui/label";

import {
  Textarea,
} from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function CrearOrdenSinCitaPage() {
  const navigate = useNavigate();

  const clientes =
    useClienteStore(
      (state) => state.clientes,
    );

  const loadingClientes =
    useClienteStore(
      (state) => state.loading,
    );

  const getClientes =
    useClienteStore(
      (state) => state.getClientes,
    );

  const vehiculos =
    useVehiculoStore(
      (state) => state.vehiculos,
    );

  const loadingVehiculos =
    useVehiculoStore(
      (state) => state.loading,
    );

  const getVehiculosPaginated =
    useVehiculoStore(
      (state) => state.getPaginated,
    );

  const crearOrden =
    useOrdenTrabajoStore(
      (state) => state.create,
    );

  const clearError =
    useOrdenTrabajoStore(
      (state) => state.clearError,
    );

  const [
    clienteSeleccionado,
    setClienteSeleccionado,
  ] = useState<Cliente | null>(null);

  const [
    vehiculoSeleccionado,
    setVehiculoSeleccionado,
  ] = useState<Vehiculo | null>(null);

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
    void getClientes({ page: 1 });

    return () => {
      clearError();
    };
  }, [getClientes, clearError]);

  useEffect(() => {
    if (!clienteSeleccionado) {
      return;
    }

    void getVehiculosPaginated({
      cliente: clienteSeleccionado.id,
      page: 1,
    });

    setVehiculoSeleccionado(null);
  }, [
    clienteSeleccionado,
    getVehiculosPaginated,
  ]);

  const handleCrearOrden =
    async (): Promise<void> => {
      if (!clienteSeleccionado) {
        setErrorFormulario(
          "Debe seleccionar un cliente.",
        );

        return;
      }

      if (!vehiculoSeleccionado) {
        setErrorFormulario(
          "Debe seleccionar un vehículo.",
        );

        return;
      }

      const motivoLimpio =
        motivoIngreso.trim();

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

      setProcesando(true);
      setErrorFormulario(null);
      clearError();

      try {
        const orden = await crearOrden({
          vehiculo: vehiculoSeleccionado.id,
          cliente: clienteSeleccionado.id,
          motivo_ingreso: motivoLimpio,
          observaciones_recepcion:
            observacionesRecepcion.trim() ||
            undefined,
          kilometraje_ingreso: kilometraje,
          fecha_estimada_entrega:
            fechaEstimadaEntrega || null,
          cita: null,
        });

        navigate(
          `/empleado/ordenes/${orden.id}`,
        );
      } catch (error) {
        const mensaje =
          error instanceof Error
            ? error.message
            : "No se pudo crear la orden de trabajo.";

        setErrorFormulario(mensaje);
      } finally {
        setProcesando(false);
      }
    };

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <ClipboardList className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <h1 className="break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Nueva orden sin cita
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Registra una orden de trabajo
                directamente, sin cita previa.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              navigate("/empleado/ordenes");
            }}
            className="shrink-0 border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a órdenes
          </Button>
        </div>
      </header>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
          <CardTitle className="text-xl font-bold text-slate-900">
            Selección de cliente y vehículo
          </CardTitle>

          <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
            Selecciona el cliente y el
            vehículo para la orden de trabajo.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 p-5 sm:p-6">
          <div className="space-y-2">
            <Label htmlFor="cliente-select">
              Cliente
              <span className="ml-1 text-red-500">
                *
              </span>
            </Label>

            <Select
              disabled={
                procesando || loadingClientes
              }
              value={
                clienteSeleccionado
                  ? String(
                      clienteSeleccionado.id,
                    )
                  : ""
              }
              onValueChange={(
                value: string,
              ) => {
                const cliente =
                  clientes.find(
                    (c) =>
                      c.id === Number(value),
                  );

                setClienteSeleccionado(
                  cliente ?? null,
                );

                setErrorFormulario(null);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    loadingClientes
                      ? "Cargando clientes..."
                      : "Seleccionar cliente"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {clientes.map((cliente) => (
                  <SelectItem
                    key={cliente.id}
                    value={String(cliente.id)}
                  >
                    {cliente.nombres}{" "}
                    {cliente.apellidos} —{" "}
                    {cliente.identificacion ??
                      "Sin ID"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehiculo-select">
              Vehículo
              <span className="ml-1 text-red-500">
                *
              </span>
            </Label>

            <Select
              disabled={
                procesando ||
                !clienteSeleccionado ||
                loadingVehiculos
              }
              value={
                vehiculoSeleccionado
                  ? String(
                      vehiculoSeleccionado.id,
                    )
                  : ""
              }
              onValueChange={(
                value: string,
              ) => {
                const vehiculo =
                  vehiculos.find(
                    (v) =>
                      v.id === Number(value),
                  );

                setVehiculoSeleccionado(
                  vehiculo ?? null,
                );

                setErrorFormulario(null);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    !clienteSeleccionado
                      ? "Primero seleccione un cliente"
                      : loadingVehiculos
                        ? "Cargando vehículos..."
                        : vehiculos.length === 0
                          ? "No hay vehículos para este cliente"
                                                  : "Seleccionar vehículo"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {vehiculos.map((vehiculo) => (
                  <SelectItem
                    key={vehiculo.id}
                    value={String(vehiculo.id)}
                  >
                    {vehiculo.placa} —{" "}
                    {vehiculo.marca_nombre}{" "}
                    {vehiculo.modelo_nombre}{" "}
                    ({vehiculo.anio})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {clienteSeleccionado &&
              !loadingVehiculos &&
              vehiculos.length === 0 && (
                <p className="text-xs text-slate-500">
                  Este cliente no tiene
                  vehículos registrados.
                </p>
              )}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
          <CardTitle className="text-xl font-bold text-slate-900">
            Información de recepción
          </CardTitle>

          <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
            Datos registrados al recibir el
            vehículo.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 p-5 sm:p-6">
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

                setErrorFormulario(null);
              }}
            />
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

                setErrorFormulario(null);
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

                  setErrorFormulario(null);
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

                  setErrorFormulario(null);
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
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={procesando}
          onClick={() => {
            navigate("/empleado/ordenes");
          }}
          className="border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          Cancelar
        </Button>

        <Button
          type="button"
          disabled={procesando}
          onClick={() => {
            void handleCrearOrden();
          }}
          className="bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          {procesando ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando orden...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Crear orden de trabajo
            </>
          )}
        </Button>
      </div>
    </main>
  );
}
