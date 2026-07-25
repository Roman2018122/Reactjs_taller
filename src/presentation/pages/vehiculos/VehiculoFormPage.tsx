
// src/presentation/pages/vehiculos/VehiculoFormPage.tsx

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import type { VehiculoFormData } from "@/domain/entities/vehiculo.entity";

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

import { useModeloVehiculoStore } from "@/presentation/store/modelo-vehiculo.store";
import { useVehiculoStore } from "@/presentation/store/vehiculo.store";

const initialFormData: VehiculoFormData = {
  modelo_vehiculo: 0,
  placa: "",
  anio: new Date().getFullYear(),
  color: "",
  kilometraje_actual: 0,
  numero_chasis: "",
};

export default function VehiculoFormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<VehiculoFormData>(initialFormData);

  const modelos = useModeloVehiculoStore(
    (state) => state.modelos,
  );

  const isLoadingModelos = useModeloVehiculoStore(
    (state) => state.isLoading,
  );

  const modelosError = useModeloVehiculoStore(
    (state) => state.error,
  );

  const getModelos = useModeloVehiculoStore(
    (state) => state.getAll,
  );

  const createVehiculo = useVehiculoStore(
    (state) => state.create,
  );

  const isLoadingVehiculo = useVehiculoStore(
    (state) => state.loading,
  );

  const vehiculoError = useVehiculoStore(
    (state) => state.error,
  );

  const clearVehiculoError = useVehiculoStore(
    (state) => state.clearError,
  );

  useEffect(() => {
    clearVehiculoError();
    void getModelos();
  }, [getModelos, clearVehiculoError]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    if (
      name === "modelo_vehiculo" ||
      name === "anio" ||
      name === "kilometraje_actual"
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
    if (formData.modelo_vehiculo <= 0) {
      return "Seleccione un modelo de vehículo.";
    }

    if (formData.placa.trim() === "") {
      return "La placa es obligatoria.";
    }

    if (formData.anio < 1950) {
      return "El año del vehículo no es válido.";
    }

    if (
      formData.anio >
      new Date().getFullYear() + 1
    ) {
      return "El año del vehículo no es válido.";
    }

    if (formData.color.trim() === "") {
      return "El color es obligatorio.";
    }

    if (formData.kilometraje_actual < 0) {
      return "El kilometraje no puede ser negativo.";
    }

    if (formData.numero_chasis.trim() === "") {
      return "El número de chasis es obligatorio.";
    }

    return null;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    clearVehiculoError();

    const validationError = validateForm();

    if (validationError !== null) {
      window.alert(validationError);
      return;
    }

    const vehiculoCreado = await createVehiculo({
      ...formData,
      placa: formData.placa
        .trim()
        .toUpperCase(),
      color: formData.color.trim(),
      numero_chasis: formData.numero_chasis
        .trim()
        .toUpperCase(),
    });

    if (vehiculoCreado) {
      navigate("/cliente/vehiculos");
    }
  };

  const handleCancel = () => {
    clearVehiculoError();
    navigate("/cliente/vehiculos");
  };

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Registrar vehículo
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Ingrese la información del vehículo que desea
          registrar.
        </p>
      </header>

      <Card className="max-w-3xl overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50">
          <CardTitle className="text-xl text-slate-900">
            Información del vehículo
          </CardTitle>

          <CardDescription className="text-slate-600">
            Complete todos los campos obligatorios para
            registrar un nuevo vehículo.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          {modelosError && (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
            >
              No se pudieron cargar los modelos:{" "}
              {modelosError}
            </p>
          )}

          {vehiculoError && (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
            >
              No se pudo registrar el vehículo:{" "}
              {vehiculoError}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label
                htmlFor="modelo_vehiculo"
                className="text-sm font-medium text-slate-700"
              >
                Modelo del vehículo
              </Label>

              <select
                id="modelo_vehiculo"
                name="modelo_vehiculo"
                value={formData.modelo_vehiculo}
                onChange={handleChange}
                disabled={
                  isLoadingModelos ||
                  isLoadingVehiculo
                }
                className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                required
              >
                <option value={0}>
                  {isLoadingModelos
                    ? "Cargando modelos..."
                    : "Seleccione un modelo"}
                </option>

                {modelos
                  .filter(
                    (modelo) => modelo.activo,
                  )
                  .map((modelo) => (
                    <option
                      key={modelo.id}
                      value={modelo.id}
                    >
                      {modelo.nombre_completo}
                    </option>
                  ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="placa"
                  className="text-sm font-medium text-slate-700"
                >
                  Placa
                </Label>

                <Input
                  id="placa"
                  name="placa"
                  type="text"
                  value={formData.placa}
                  onChange={handleChange}
                  placeholder="Ejemplo: ABC-123"
                  maxLength={10}
                  disabled={isLoadingVehiculo}
                  className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="anio"
                  className="text-sm font-medium text-slate-700"
                >
                  Año
                </Label>

                <Input
                  id="anio"
                  name="anio"
                  type="number"
                  value={formData.anio}
                  onChange={handleChange}
                  min={1950}
                  max={
                    new Date().getFullYear() + 1
                  }
                  disabled={isLoadingVehiculo}
                  className="border-slate-300 bg-white text-slate-900 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  required
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="color"
                  className="text-sm font-medium text-slate-700"
                >
                  Color
                </Label>

                <Input
                  id="color"
                  name="color"
                  type="text"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Ejemplo: Rojo"
                  maxLength={50}
                  disabled={isLoadingVehiculo}
                  className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="kilometraje_actual"
                  className="text-sm font-medium text-slate-700"
                >
                  Kilometraje actual
                </Label>

                <Input
                  id="kilometraje_actual"
                  name="kilometraje_actual"
                  type="number"
                  value={
                    formData.kilometraje_actual
                  }
                  onChange={handleChange}
                  min={0}
                  disabled={isLoadingVehiculo}
                  className="border-slate-300 bg-white text-slate-900 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="numero_chasis"
                className="text-sm font-medium text-slate-700"
              >
                Número de chasis
              </Label>

              <Input
                id="numero_chasis"
                name="numero_chasis"
                type="text"
                value={formData.numero_chasis}
                onChange={handleChange}
                placeholder="Ingrese el número de chasis"
                maxLength={100}
                disabled={isLoadingVehiculo}
                className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                required
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row">
              <Button
                type="submit"
                disabled={
                  isLoadingVehiculo ||
                  isLoadingModelos ||
                  modelos.length === 0
                }
                className="bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoadingVehiculo
                  ? "Guardando..."
                  : "Registrar vehículo"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoadingVehiculo}
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

