import type {
  FormEvent,
} from "react";

import { Plus } from "lucide-react";

import type {
  VehiculoEmpleadoFormData,
} from "@/domain/entities/vehiculo.entity";

import MarcaDialog from "@/presentation/components/common/dialogs/MarcaDialog";
import ModeloDialog from "@/presentation/components/common/dialogs/ModeloDialog";

export interface VehiculoSelectOption {
  value: number;
  label: string;
}

interface VehiculoFormProps {
  titulo: string;
  descripcion: string;
  textoBoton: string;

  formData: VehiculoEmpleadoFormData;

  clienteOptions: VehiculoSelectOption[];
  marcaOptions: VehiculoSelectOption[];
  modeloOptions: VehiculoSelectOption[];

  marcaSeleccionada: number;

  loading: boolean;
  loadingOptions?: boolean;

  onChange: (
    field: keyof VehiculoEmpleadoFormData,
    value: string | number | boolean,
  ) => void;

  onMarcaChange: (
    marcaId: number,
  ) => void;

  onMarcaCreada: (
    marcaId: number,
  ) => void;

  onModeloCreado: (
    modeloId: number,
  ) => void;

  onCrearCliente: () => void;

  onSubmit: (
    event: FormEvent<HTMLFormElement>,
  ) => void;

  onCancel: () => void;
}

export default function VehiculoForm({
  titulo,
  descripcion,
  textoBoton,
  formData,
  clienteOptions,
  marcaOptions,
  modeloOptions,
  marcaSeleccionada,
  loading,
  loadingOptions = false,
  onChange,
  onMarcaChange,
  onMarcaCreada,
  onModeloCreado,
  onCrearCliente,
  onSubmit,
  onCancel,
}: VehiculoFormProps) {
  const currentYear =
    new Date().getFullYear();

  const formDisabled =
    loading || loadingOptions;

  return (
    <>
      <header className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {titulo}
        </h1>

        <p className="mt-1 text-sm text-slate-600">
          {descripcion}
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <div className="mb-2 flex items-center gap-2">
              <label
                htmlFor="cliente"
                className="text-sm font-medium text-slate-700"
              >
                Cliente propietario
              </label>

              <button
                type="button"
                onClick={onCrearCliente}
                className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-0.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
              >
                <Plus className="h-3 w-3" />
                Crear cliente
              </button>
            </div>

            <select
              id="cliente"
              name="cliente"
              value={formData.cliente}
              onChange={(event) => {
                onChange(
                  "cliente",
                  Number(event.target.value),
                );
              }}
              required
              disabled={formDisabled}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value={0}>
                Seleccione un cliente
              </option>

              {clienteOptions.map((cliente) => (
                <option
                  key={cliente.value}
                  value={cliente.value}
                >
                  {cliente.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <label
                htmlFor="marca"
                className="text-sm font-medium text-slate-700"
              >
                Marca
              </label>

              <MarcaDialog
                onMarcaCreada={
                  onMarcaCreada
                }
              />
            </div>

            <select
              id="marca"
              name="marca"
              value={marcaSeleccionada}
              onChange={(event) => {
                onMarcaChange(
                  Number(event.target.value),
                );
              }}
              required
              disabled={formDisabled}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value={0}>
                Seleccione una marca
              </option>

              {marcaOptions.map((marca) => (
                <option
                  key={marca.value}
                  value={marca.value}
                >
                  {marca.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <label
                htmlFor="modelo_vehiculo"
                className="text-sm font-medium text-slate-700"
              >
                Modelo
              </label>

              <ModeloDialog
                marcaId={marcaSeleccionada}
                onModeloCreado={
                  onModeloCreado
                }
              />
            </div>

            <select
              id="modelo_vehiculo"
              name="modelo_vehiculo"
              value={formData.modelo_vehiculo}
              onChange={(event) => {
                onChange(
                  "modelo_vehiculo",
                  Number(event.target.value),
                );
              }}
              required
              disabled={
                formDisabled ||
                marcaSeleccionada === 0
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value={0}>
                {marcaSeleccionada === 0
                  ? "Primero seleccione una marca"
                  : "Seleccione un modelo"}
              </option>

              {modeloOptions.map((modelo) => (
                <option
                  key={modelo.value}
                  value={modelo.value}
                >
                  {modelo.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="placa"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Placa
            </label>

            <input
              id="placa"
              name="placa"
              type="text"
              value={formData.placa}
              onChange={(event) => {
                onChange(
                  "placa",
                  event.target.value.toUpperCase(),
                );
              }}
              required
              disabled={formDisabled}
              placeholder="Ejemplo: ABC-1234"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm uppercase text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="anio"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Año
            </label>

            <input
              id="anio"
              name="anio"
              type="number"
              value={formData.anio}
              onChange={(event) => {
                onChange(
                  "anio",
                  Number(event.target.value),
                );
              }}
              required
              min={1900}
              max={currentYear + 1}
              disabled={formDisabled}
              placeholder={`Ejemplo: ${currentYear}`}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="color"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Color
            </label>

            <input
              id="color"
              name="color"
              type="text"
              value={formData.color}
              onChange={(event) => {
                onChange(
                  "color",
                  event.target.value,
                );
              }}
              required
              disabled={formDisabled}
              placeholder="Ejemplo: Negro"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="kilometraje_actual"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Kilometraje actual
            </label>

            <input
              id="kilometraje_actual"
              name="kilometraje_actual"
              type="number"
              value={formData.kilometraje_actual}
              onChange={(event) => {
                onChange(
                  "kilometraje_actual",
                  Number(event.target.value),
                );
              }}
              required
              min={0}
              disabled={formDisabled}
              placeholder="Ejemplo: 45000"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="numero_chasis"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Número de chasis
            </label>

            <input
              id="numero_chasis"
              name="numero_chasis"
              type="text"
              value={formData.numero_chasis}
              onChange={(event) => {
                onChange(
                  "numero_chasis",
                  event.target.value.toUpperCase(),
                );
              }}
              required
              disabled={formDisabled}
              placeholder="Ingrese el número de chasis"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm uppercase text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <label
            htmlFor="activo"
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              id="activo"
              name="activo"
              type="checkbox"
              checked={formData.activo}
              onChange={(event) => {
                onChange(
                  "activo",
                  event.target.checked,
                );
              }}
              disabled={formDisabled}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />

            <span>
              <span className="block text-sm font-medium text-slate-900">
                Vehículo activo
              </span>

              <span className="block text-xs text-slate-600">
                Permite utilizar este vehículo en citas,
                órdenes de trabajo y servicios del taller.
              </span>
            </span>
          </label>
        </div>

        {loadingOptions && (
          <p className="mt-5 text-sm text-slate-500">
            Cargando clientes, marcas y modelos...
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={
              formDisabled ||
              formData.cliente === 0 ||
              marcaSeleccionada === 0 ||
              formData.modelo_vehiculo === 0
            }
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Guardando..."
              : textoBoton}
          </button>
        </div>
      </form>
    </>
  );
}