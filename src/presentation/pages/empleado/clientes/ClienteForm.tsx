import type {
  ChangeEvent,
  FormEvent,
} from "react";

import type {
  ClienteFormData,
} from "@/domain/entities/cliente.entity";

interface ClienteFormProps {
  titulo: string;
  descripcion: string;
  textoBoton: string;
  formData: ClienteFormData;
  loading: boolean;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => void;
  onSubmit: (
    event: FormEvent<HTMLFormElement>,
  ) => void;
  onCancel: () => void;
}

export default function ClienteForm({
  titulo,
  descripcion,
  textoBoton,
  formData,
  loading,
  onChange,
  onSubmit,
  onCancel,
}: ClienteFormProps) {
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
          <div>
            <label
              htmlFor="nombres"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Nombres
            </label>

            <input
              id="nombres"
              name="nombres"
              type="text"
              value={formData.nombres}
              onChange={onChange}
              required
              disabled={loading}
              placeholder="Ingrese los nombres"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="apellidos"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Apellidos
            </label>

            <input
              id="apellidos"
              name="apellidos"
              type="text"
              value={formData.apellidos}
              onChange={onChange}
              required
              disabled={loading}
              placeholder="Ingrese los apellidos"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="identificacion"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Identificación
            </label>

            <input
              id="identificacion"
              name="identificacion"
              type="text"
              value={formData.identificacion}
              onChange={onChange}
              required
              disabled={loading}
              placeholder="Ejemplo: 0923456789"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="telefono"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Teléfono
            </label>

            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={onChange}
              required
              disabled={loading}
              placeholder="Ejemplo: 0991234567"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              disabled={loading}
              placeholder="cliente@email.com"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="direccion"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Dirección
            </label>

            <textarea
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={onChange}
              disabled={loading}
              rows={3}
              placeholder="Ingrese la dirección del cliente"
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
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
              onChange={onChange}
              disabled={loading}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />

            <span>
              <span className="block text-sm font-medium text-slate-900">
                Cliente activo
              </span>

              <span className="block text-xs text-slate-600">
                Permite utilizar este cliente en las operaciones del taller.
              </span>
            </span>
          </label>
        </div>

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
            disabled={loading}
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