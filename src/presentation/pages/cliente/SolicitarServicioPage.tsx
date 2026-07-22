// src/presentation/pages/cliente/SolicitarServicioPage.tsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useNavigate,
} from "react-router-dom";
import {
  ArrowLeft,
  CalendarPlus,
  Car,
  CheckCircle2,
  Loader2,
  Plus,
  Wrench,
} from "lucide-react";

import {
  serviceRequestStorage,
} from "@/infrastructure/storage/service-request-storage";

import {
  useVehiculoStore,
} from "@/presentation/store/vehiculo.store";

import { Button } from "@/presentation/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";

// ─── Componente ───────────────────────────────────────────────────────────────

export default function SolicitarServicioPage() {
  const navigate = useNavigate();

  const [
    selectedVehicleId,
    setSelectedVehicleId,
  ] = useState<number | null>(null);

  const {
    vehiculos,
    loading,
    error,
    getAll,
  } = useVehiculoStore();

  const pendingRequest = useMemo(
    () => serviceRequestStorage.get(),
    [],
  );

  useEffect(() => {
    if (pendingRequest) {
      return;
    }

    navigate("/servicios", {
      replace: true,
    });
  }, [
    pendingRequest,
    navigate,
  ]);

  useEffect(() => {
    if (!pendingRequest) {
      return;
    }

    void getAll();
  }, [
    pendingRequest,
    getAll,
  ]);

  useEffect(() => {
    const unicoVehiculo =
      vehiculos[0];

    if (
      vehiculos.length === 1 &&
      unicoVehiculo &&
      selectedVehicleId === null
    ) {
      setSelectedVehicleId(
        unicoVehiculo.id,
      );
    }
  }, [
    vehiculos,
    selectedVehicleId,
  ]);

  if (!pendingRequest) {
    return null;
  }

  const servicioId =
    pendingRequest.servicioId;

  const servicioNombre =
    pendingRequest.servicioNombre;

  function handleSelectVehicle(
    vehicleId: number,
  ): void {
    setSelectedVehicleId(vehicleId);
  }

  function handleRegisterVehicle(): void {
    navigate(
      "/cliente/vehiculos/nuevo",
      {
        state: {
          returnTo:
            "/cliente/solicitar-servicio",

          fromServiceRequest: true,
        },
      },
    );
  }

  function handleContinue(): void {
    if (selectedVehicleId === null) {
      return;
    }

    navigate(
      "/cliente/citas/nueva",
      {
        state: {
          vehiculoId:
            selectedVehicleId,

          servicioId,

          servicioNombre,

          fromServiceRequest: true,
          returnTo: "/cliente/solicitar-servicio",
        },
      },
    );
  }

  function handleCancel(): void {
    serviceRequestStorage.clear();

    navigate("/servicios", {
      replace: true,
    });
  

  // Continúa aquí el return visual.
}

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      {/* Encabezado */}

      <div className="space-y-2">
        <Button
          type="button"
          variant="ghost"
          className="-ml-3"
          onClick={() =>
            navigate("/servicios")
          }
        >
          <ArrowLeft className="mr-2 h-4 w-4" />

          Volver a servicios
        </Button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Solicitar servicio
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Selecciona el vehículo que recibirá
            el servicio.
          </p>
        </div>
      </div>

      {/* Servicio seleccionado */}

      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <Wrench className="h-5 w-5 text-blue-700" />
            </div>

            <div className="space-y-1">
              <CardTitle className="text-lg text-blue-950">
                Servicio seleccionado
              </CardTitle>

              <CardDescription className="text-blue-700">
                Se agregará automáticamente al
                formulario de la cita.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-white p-4">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />

            <div>
            <p className="font-semibold text-slate-900">
                {servicioNombre}
            </p>

            <p className="text-sm text-slate-500">
                Servicio #{servicioId}
            </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cargando */}

      {loading && (
        <Card>
          <CardContent className="flex min-h-48 flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

            <p className="text-sm text-slate-600">
              Cargando tus vehículos...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Error */}

      {!loading && error && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-lg text-red-800">
              No pudimos cargar tus vehículos
            </CardTitle>

            <CardDescription className="text-red-700">
              {error}
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => void getAll()}
            >
              Intentar nuevamente
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Cliente sin vehículos */}

      {!loading &&
        !error &&
        vehiculos.length === 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-amber-100 p-2">
                  <Car className="h-5 w-5 text-amber-700" />
                </div>

                <div className="space-y-1">
                  <CardTitle>
                    Registra tu primer vehículo
                  </CardTitle>

                  <CardDescription>
                    Para solicitar el servicio
                    necesitamos conocer el vehículo
                    que será atendido.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-amber-900">
                  Después de registrar el vehículo
                  regresarás automáticamente a esta
                  solicitud.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-wrap gap-3">
              <Button
                type="button"
                onClick={
                  handleRegisterVehicle
                }
              >
                <Plus className="mr-2 h-4 w-4" />

                Registrar vehículo
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                Cancelar solicitud
              </Button>
            </CardFooter>
          </Card>
        )}

      {/* Selección de vehículo */}

      {!loading &&
        !error &&
        vehiculos.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>
                Elige un vehículo
              </CardTitle>

              <CardDescription>
                Selecciona el vehículo que recibirá
                el servicio{" "}
                <strong>
                    {servicioNombre}
                </strong>
                .
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {vehiculos.map(
                (vehiculo) => {
                  const isSelected =
                    selectedVehicleId ===
                    vehiculo.id;

                  return (
                    <button
                      key={vehiculo.id}
                      type="button"
                      aria-pressed={
                        isSelected
                      }
                      onClick={() =>
                        handleSelectVehicle(
                          vehiculo.id,
                        )
                      }
                      className={[
                        "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                        isSelected
                          ? "border-blue-600 bg-blue-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "rounded-lg p-3",
                          isSelected
                            ? "bg-blue-100"
                            : "bg-slate-100",
                        ].join(" ")}
                      >
                        <Car
                          className={[
                            "h-5 w-5",
                            isSelected
                              ? "text-blue-700"
                              : "text-slate-600",
                          ].join(" ")}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold uppercase text-slate-900">
                          {vehiculo.placa}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Vehículo registrado
                        </p>
                      </div>

                      <div
                        className={[
                          "flex h-6 w-6 items-center justify-center rounded-full border",
                          isSelected
                            ? "border-blue-600 bg-blue-600"
                            : "border-slate-300 bg-white",
                        ].join(" ")}
                      >
                        {isSelected && (
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </button>
                  );
                },
              )}

              <Button
                type="button"
                variant="outline"
                className="mt-2 w-full border-dashed"
                onClick={
                  handleRegisterVehicle
                }
              >
                <Plus className="mr-2 h-4 w-4" />

                Registrar otro vehículo
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col-reverse gap-3 border-t bg-slate-50/70 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                Cancelar solicitud
              </Button>

              <Button
                type="button"
                disabled={
                  selectedVehicleId ===
                  null
                }
                onClick={handleContinue}
              >
                <CalendarPlus className="mr-2 h-4 w-4" />

                Continuar con la cita
              </Button>
            </CardFooter>
          </Card>
        )}
    </section>
  );
}