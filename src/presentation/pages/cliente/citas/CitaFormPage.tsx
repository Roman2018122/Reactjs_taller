// src/presentation/pages/citas/CitaFormPage.tsx

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import type { CitaFormData } from "@/domain/entities/cita.entity";
import type { Servicio } from "@/domain/entities/servicio.entity";

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

function formatearPrecio(
  precio: string | null,
): string {
  if (precio === null) {
    return "Precio por confirmar";
  }

  const valor = Number(precio);

  if (Number.isNaN(valor)) {
    return "Precio por confirmar";
  }

  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
  }).format(valor);
}

function obtenerFechaMinima(): string {
  const fecha = new Date();

  fecha.setMinutes(
    fecha.getMinutes() -
      fecha.getTimezoneOffset(),
  );

  return fecha.toISOString().slice(0, 16);
}

export default function CitaFormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<CitaFormData>(initialFormData);

  const vehiculos = useVehiculoStore(
    (state) => state.vehiculos,
  );

  const isLoadingVehiculos =
    useVehiculoStore(
      (state) => state.loading,
    );

  const vehiculosError =
    useVehiculoStore(
      (state) => state.error,
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

  const serviciosError =
    useServicioStore(
      (state) => state.error,
    );

  const getServicios = useServicioStore(
    (state) => state.getAll,
  );

  const createCita = useCitaStore(
    (state) => state.create,
  );

  const isLoadingCita = useCitaStore(
    (state) => state.loading,
  );

  const citaError = useCitaStore(
    (state) => state.error,
  );

  const clearCitaError = useCitaStore(
    (state) => state.clearError,
  );

  const serviciosDisponibles =
    useMemo<Servicio[]>(() => {
      return servicios.filter(
        (servicio) =>
          servicio.activo &&
          servicio.visible_publicamente,
      );
    }, [servicios]);

  const vehiculosActivos = useMemo(() => {
    return vehiculos.filter(
      (vehiculo) => vehiculo.activo,
    );
  }, [vehiculos]);

  useEffect(() => {
    clearCitaError();

    void getVehiculos();
    void getServicios();
  }, [
    clearCitaError,
    getServicios,
    getVehiculos,
  ]);

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
      return "Seleccione la fecha y hora de la cita.";
    }

    const fechaSeleccionada = new Date(
      formData.fecha_solicitada,
    );

    if (
      Number.isNaN(
        fechaSeleccionada.getTime(),
      )
    ) {
      return "La fecha seleccionada no es válida.";
    }

    if (
      fechaSeleccionada.getTime() <=
      Date.now()
    ) {
      return "La fecha de la cita debe ser futura.";
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

    const validationError = validateForm();

    if (validationError !== null) {
      window.alert(validationError);
      return;
    }

    const fechaConvertida = new Date(
      formData.fecha_solicitada,
    ).toISOString();

    const citaCreada = await createCita({
      ...formData,
      fecha_solicitada: fechaConvertida,
      motivo: formData.motivo.trim(),
      observaciones_cliente:
        formData.observaciones_cliente.trim(),
    });

    if (citaCreada) {
      navigate("/cliente/citas");
    }
  };

  const handleCancel = (): void => {
    clearCitaError();
    navigate("/cliente/citas");
  };

  const formularioCargando =
    isLoadingCita ||
    isLoadingVehiculos ||
    isLoadingServicios;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Solicitar cita
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Seleccione su vehículo, el servicio
          requerido y una fecha para la atención.
        </p>
      </header>

      <Card className="max-w-3xl overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50">
          <CardTitle className="text-xl text-slate-900">
            Información de la cita
          </CardTitle>

          <CardDescription className="text-slate-600">
            Complete los campos necesarios para
            enviar su solicitud al taller.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          {vehiculosError && (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
            >
              No se pudieron cargar los vehículos:{" "}
              {vehiculosError}
            </p>
          )}

          {serviciosError && (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
            >
              No se pudieron cargar los servicios:{" "}
              {serviciosError}
            </p>
          )}

          {citaError && (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
            >
              No se pudo registrar la cita:{" "}
              {citaError}
            </p>
          )}

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
                  disabled={formularioCargando}
                  className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                  required
                >
                  <option value={0}>
                    {isLoadingVehiculos
                      ? "Cargando vehículos..."
                      : "Seleccione un vehículo"}
                  </option>

                  {vehiculosActivos.map(
                    (vehiculo) => (
                      <option
                        key={vehiculo.id}
                        value={vehiculo.id}
                      >
                        {vehiculo.placa} -{" "}
                        {vehiculo.marca_nombre}{" "}
                        {vehiculo.modelo_nombre}
                      </option>
                    ),
                  )}
                </select>

                {!isLoadingVehiculos &&
                  vehiculosActivos.length ===
                    0 && (
                    <p className="text-sm text-amber-700">
                      Debe registrar un vehículo
                      antes de solicitar una cita.
                    </p>
                  )}
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
                  disabled={formularioCargando}
                  className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                  required
                >
                  <option value={0}>
                    {isLoadingServicios
                      ? "Cargando servicios..."
                      : "Seleccione un servicio"}
                  </option>

                  {serviciosDisponibles.map(
                    (servicio) => (
                      <option
                        key={servicio.id}
                        value={servicio.id}
                      >
                        {servicio.nombre} -{" "}
                        {formatearPrecio(
                          servicio.precio_referencial,
                        )}
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
                min={obtenerFechaMinima()}
                disabled={isLoadingCita}
                className="border-slate-300 bg-white text-slate-900 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                required
              />

              <p className="text-xs text-slate-500">
                La fecha será revisada y confirmada
                posteriormente por el taller.
              </p>
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
                placeholder="Describa brevemente el motivo de la cita"
                rows={4}
                maxLength={500}
                disabled={isLoadingCita}
                className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
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
                placeholder="Información adicional para el taller"
                rows={4}
                maxLength={1000}
                disabled={isLoadingCita}
                className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row">
              <Button
                type="submit"
                disabled={
                  formularioCargando ||
                  vehiculosActivos.length ===
                    0 ||
                  serviciosDisponibles.length ===
                    0
                }
                className="bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoadingCita
                  ? "Enviando..."
                  : "Solicitar cita"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoadingCita}
                className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}