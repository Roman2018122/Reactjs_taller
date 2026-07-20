// src/presentation/pages/citas/CitaEditarPage.tsx

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import type { CitaFormData } from "@/domain/entities/cita.entity";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCitaStore } from "@/presentation/store/cita.store";
import { useServicioStore } from "@/presentation/store/servicio.store";
import { useVehiculoStore } from "@/presentation/store/vehiculo.store";

const initialFormData: CitaFormData = {
  vehiculo: 0,
  servicio: 0,
  fecha_solicitada: "",
  motivo: "",
  observaciones_cliente: "",
};

function convertirAFechaLocal(
  fecha: string,
): string {
  const fechaConvertida = new Date(fecha);

  if (Number.isNaN(fechaConvertida.getTime())) {
    return "";
  }

  const diferenciaZonaHoraria =
    fechaConvertida.getTimezoneOffset();

  const fechaLocal = new Date(
    fechaConvertida.getTime() -
      diferenciaZonaHoraria * 60_000,
  );

  return fechaLocal
    .toISOString()
    .slice(0, 16);
}

export default function CitaEditarPage() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const [formData, setFormData] =
    useState<CitaFormData>(initialFormData);

  const cita = useCitaStore(
    (state) => state.cita,
  );

  const isLoadingCita = useCitaStore(
    (state) => state.loading,
  );

  const citaError = useCitaStore(
    (state) => state.error,
  );

  const getCitaById = useCitaStore(
    (state) => state.getById,
  );

  const updateCita = useCitaStore(
    (state) => state.update,
  );

  const clearCita = useCitaStore(
    (state) => state.clearCita,
  );

  const clearCitaError = useCitaStore(
    (state) => state.clearError,
  );

  const vehiculos = useVehiculoStore(
    (state) => state.vehiculos,
  );

  const isLoadingVehiculos =
    useVehiculoStore(
      (state) => state.loading,
    );

  const getVehiculos = useVehiculoStore(
    (state) => state.getAll,
  );

  const servicios = useServicioStore(
    (state) => state.servicios,
  );

  const isLoadingServicios =
    useServicioStore(
      (state) => state.isLoading,
    );

  const getServicios = useServicioStore(
    (state) => state.getAll,
  );

  const vehiculosActivos = useMemo(() => {
    return vehiculos.filter(
      (vehiculo) => vehiculo.activo,
    );
  }, [vehiculos]);

  const serviciosDisponibles =
    useMemo(() => {
      return servicios.filter(
        (servicio) =>
          servicio.activo &&
          servicio.visible_publicamente,
      );
    }, [servicios]);

  useEffect(() => {
    clearCita();
    clearCitaError();

    const citaId = Number(id);

    if (
      !Number.isInteger(citaId) ||
      citaId <= 0
    ) {
      return;
    }

    void getCitaById(citaId);
    void getVehiculos();
    void getServicios();

    return () => {
      clearCita();
    };
  }, [
    clearCita,
    clearCitaError,
    getCitaById,
    getServicios,
    getVehiculos,
    id,
  ]);

  useEffect(() => {
    if (!cita) {
      return;
    }

    setFormData({
      vehiculo: cita.vehiculo,
      servicio: cita.servicio,
      fecha_solicitada:
        convertirAFechaLocal(
          cita.fecha_solicitada,
        ),
      motivo: cita.motivo,
      observaciones_cliente:
        cita.observaciones_cliente,
    });
  }, [cita]);

  const handleChange = (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >,
  ): void => {
    const { name, value } = event.target;

    if (
      name === "vehiculo" ||
      name === "servicio"
    ) {
      setFormData((currentFormData) => ({
        ...currentFormData,
        [name]: Number(value),
      }));

      return;
    }

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const validateForm = (): string | null => {
    if (formData.vehiculo <= 0) {
      return "Seleccione un vehículo.";
    }

    if (formData.servicio <= 0) {
      return "Seleccione un servicio.";
    }

    if (
      formData.fecha_solicitada.trim() ===
      ""
    ) {
      return "Seleccione la fecha y hora.";
    }

    if (formData.motivo.trim() === "") {
      return "El motivo es obligatorio.";
    }

    return null;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    clearCitaError();

    const citaId = Number(id);

    if (
      !Number.isInteger(citaId) ||
      citaId <= 0
    ) {
      window.alert(
        "El identificador de la cita no es válido.",
      );
      return;
    }

    const validationError = validateForm();

    if (validationError !== null) {
      window.alert(validationError);
      return;
    }

    const citaActualizada =
      await updateCita(citaId, {
        ...formData,
        fecha_solicitada: new Date(
          formData.fecha_solicitada,
        ).toISOString(),
        motivo: formData.motivo.trim(),
        observaciones_cliente:
          formData.observaciones_cliente.trim(),
      });

    if (citaActualizada) {
      navigate(`/cliente/citas/${citaId}`);
    }
  };

  const handleCancel = (): void => {
    clearCitaError();

    if (cita) {
      navigate(`/cliente/citas/${cita.id}`);
      return;
    }

    navigate("/cliente/citas");
  };

  const citaNoEditable =
    cita !== null &&
    cita.estado !== "SOLICITADA" &&
    cita.estado !== "REPROGRAMADA";

  const formularioCargando =
    isLoadingCita ||
    isLoadingVehiculos ||
    isLoadingServicios;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Editar cita
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Modifique los datos de la solicitud
          seleccionada.
        </p>
      </header>

      {citaNoEditable && (
        <section
          role="alert"
          className="max-w-3xl rounded-xl border border-amber-200 bg-amber-50 p-5"
        >
          <p className="text-sm font-medium text-amber-800">
            Esta cita ya no puede modificarse
            porque su estado es{" "}
            {cita?.estado_display}.
          </p>

          <Button
            type="button"
            onClick={handleCancel}
            className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
          >
            Volver al detalle
          </Button>
        </section>
      )}

      {!citaNoEditable && (
        <Card className="max-w-3xl overflow-hidden border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-200 bg-slate-50">
            <CardTitle className="text-xl text-slate-900">
              Información de la cita
            </CardTitle>

            <CardDescription className="text-slate-600">
              Actualice únicamente los datos que
              necesite cambiar.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 sm:p-6">
            {citaError && (
              <p
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
              >
                No se pudo procesar la cita:{" "}
                {citaError}
              </p>
            )}

            {isLoadingCita && !cita && (
              <p className="text-sm text-slate-600">
                Cargando información de la cita...
              </p>
            )}

            {cita && (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="vehiculo"
                      className="text-sm font-medium text-slate-700"
                    >
                      Vehículo
                    </Label>

                    <select
                      id="vehiculo"
                      name="vehiculo"
                      value={formData.vehiculo}
                      onChange={handleChange}
                      disabled={
                        formularioCargando
                      }
                      className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
                      required
                    >
                      <option value={0}>
                        Seleccione un vehículo
                      </option>

                      {vehiculosActivos.map(
                        (vehiculo) => (
                          <option
                            key={vehiculo.id}
                            value={vehiculo.id}
                          >
                            {vehiculo.placa} -{" "}
                            {
                              vehiculo.marca_nombre
                            }{" "}
                            {
                              vehiculo.modelo_nombre
                            }
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="servicio"
                      className="text-sm font-medium text-slate-700"
                    >
                      Servicio
                    </Label>

                    <select
                      id="servicio"
                      name="servicio"
                      value={formData.servicio}
                      onChange={handleChange}
                      disabled={
                        formularioCargando
                      }
                      className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
                      required
                    >
                      <option value={0}>
                        Seleccione un servicio
                      </option>

                      {serviciosDisponibles.map(
                        (servicio) => (
                          <option
                            key={servicio.id}
                            value={servicio.id}
                          >
                            {servicio.nombre}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="fecha_solicitada"
                    className="text-sm font-medium text-slate-700"
                  >
                    Fecha y hora solicitada
                  </Label>

                  <Input
                    id="fecha_solicitada"
                    name="fecha_solicitada"
                    type="datetime-local"
                    value={
                      formData.fecha_solicitada
                    }
                    onChange={handleChange}
                    disabled={isLoadingCita}
                    className="border-slate-300 bg-white text-slate-900 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="motivo"
                    className="text-sm font-medium text-slate-700"
                  >
                    Motivo
                  </Label>

                  <textarea
                    id="motivo"
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    disabled={isLoadingCita}
                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="observaciones_cliente"
                    className="text-sm font-medium text-slate-700"
                  >
                    Observaciones adicionales
                  </Label>

                  <textarea
                    id="observaciones_cliente"
                    name="observaciones_cliente"
                    value={
                      formData.observaciones_cliente
                    }
                    onChange={handleChange}
                    rows={4}
                    maxLength={1000}
                    disabled={isLoadingCita}
                    className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row">
                  <Button
                    type="submit"
                    disabled={
                      formularioCargando
                    }
                    className="bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoadingCita
                      ? "Guardando..."
                      : "Guardar cambios"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoadingCita}
                    className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </main>
  );
}