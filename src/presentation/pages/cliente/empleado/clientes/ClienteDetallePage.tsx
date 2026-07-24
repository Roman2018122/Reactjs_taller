import { useEffect } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useClienteStore } from "@/presentation/store/cliente.store";

const formatearFecha = (
  fecha: string,
): string => {
  return new Intl.DateTimeFormat(
    "es-EC",
    {
      dateStyle: "long",
      timeStyle: "short",
    },
  ).format(new Date(fecha));
};

export default function ClienteDetallePage() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const {
    clienteSeleccionado,
    loading,
    error,
    getClienteById,
    deleteCliente,
    clearClienteSeleccionado,
    clearError,
  } = useClienteStore();

  const clienteId = Number(id);

  useEffect(() => {
    if (
      !Number.isInteger(clienteId) ||
      clienteId <= 0
    ) {
      return;
    }

    void getClienteById(clienteId);

    return () => {
      clearClienteSeleccionado();
    };
  }, [
    clienteId,
    getClienteById,
    clearClienteSeleccionado,
  ]);

  const handleVolver = (): void => {
    navigate("/empleado/clientes");
  };

  const handleEditar = (): void => {
    navigate(
      `/empleado/clientes/${clienteId}/editar`,
    );
  };

  const handleEliminar =
    async (): Promise<void> => {
      if (!clienteSeleccionado) {
        return;
      }

      const nombreCompleto =
        `${clienteSeleccionado.nombres} ${clienteSeleccionado.apellidos}`.trim();

      const confirmado = window.confirm(
        `¿Está seguro de eliminar al cliente ${nombreCompleto}?`,
      );

      if (!confirmado) {
        return;
      }

      const eliminado = await deleteCliente(
        clienteSeleccionado.id,
      );

      if (eliminado) {
        navigate("/empleado/clientes");
      }
    };

  if (
    !Number.isInteger(clienteId) ||
    clienteId <= 0
  ) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
          <h1 className="text-lg font-semibold text-red-800">
            Cliente no válido
          </h1>

          <p className="mt-2 text-sm text-red-700">
            El identificador del cliente no es
            correcto.
          </p>

          <button
            type="button"
            onClick={handleVolver}
            className="mt-5 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Volver a clientes
          </button>
        </section>
      </main>
    );
  }

  if (
    loading &&
    !clienteSeleccionado
  ) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 shadow-sm">
          Cargando cliente...
        </p>
      </main>
    );
  }

  if (
    error &&
    !clienteSeleccionado
  ) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <section
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm"
        >
          <h1 className="text-lg font-semibold text-red-800">
            No se pudo consultar el cliente
          </h1>

          <p className="mt-2 text-sm text-red-700">
            {error}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                clearError();

                void getClienteById(
                  clienteId,
                );
              }}
              className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Reintentar
            </button>

            <button
              type="button"
              onClick={handleVolver}
              className="rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
            >
              Volver
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (!clienteSeleccionado) {
    return null;
  }

  const nombreCompleto =
    `${clienteSeleccionado.nombres} ${clienteSeleccionado.apellidos}`.trim();

  const esPresencial =
    clienteSeleccionado.usuario === null;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Cliente #{clienteSeleccionado.id}
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {nombreCompleto ||
              `Cliente ${clienteSeleccionado.id}`}
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Información registrada para la gestión
            interna del taller.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleVolver}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Volver
          </button>

          <button
            type="button"
            onClick={handleEditar}
            className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
          >
            Editar
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => {
              void handleEliminar();
            }}
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Eliminando..."
              : "Eliminar"}
          </button>
        </div>
      </header>

      {error && (
        <section
          role="alert"
          className="mb-6 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={clearError}
            className="self-start rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 sm:self-auto"
          >
            Cerrar
          </button>
        </section>
      )}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Datos del cliente
          </h2>
        </div>

        <dl className="grid gap-0 sm:grid-cols-2">
          <div className="border-b border-slate-200 px-5 py-4 sm:border-r">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Nombres
            </dt>

            <dd className="mt-1 text-sm font-medium text-slate-900">
              {clienteSeleccionado.nombres}
            </dd>
          </div>

          <div className="border-b border-slate-200 px-5 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Apellidos
            </dt>

            <dd className="mt-1 text-sm font-medium text-slate-900">
              {clienteSeleccionado.apellidos ||
                "No registrados"}
            </dd>
          </div>

          <div className="border-b border-slate-200 px-5 py-4 sm:border-r">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Identificación
            </dt>

            <dd className="mt-1 text-sm text-slate-700">
              {clienteSeleccionado.identificacion ||
                "No registrada"}
            </dd>
          </div>

          <div className="border-b border-slate-200 px-5 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Teléfono
            </dt>

            <dd className="mt-1 text-sm text-slate-700">
              {clienteSeleccionado.telefono ||
                "No registrado"}
            </dd>
          </div>

          <div className="border-b border-slate-200 px-5 py-4 sm:border-r">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Correo electrónico
            </dt>

            <dd className="mt-1 break-all text-sm text-slate-700">
              {clienteSeleccionado.email ||
                "No registrado"}
            </dd>
          </div>

          <div className="border-b border-slate-200 px-5 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Dirección
            </dt>

            <dd className="mt-1 text-sm text-slate-700">
              {clienteSeleccionado.direccion ||
                "No registrada"}
            </dd>
          </div>

          <div className="border-b border-slate-200 px-5 py-4 sm:border-r">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Tipo de cliente
            </dt>

            <dd className="mt-2">
              <span
                className={
                  esPresencial
                    ? "inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700"
                    : "inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700"
                }
              >
                {esPresencial
                  ? "Cliente presencial"
                  : "Cliente con acceso al portal"}
              </span>
            </dd>
          </div>

          <div className="border-b border-slate-200 px-5 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Estado
            </dt>

            <dd className="mt-2">
              <span
                className={
                  clienteSeleccionado.activo
                    ? "inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700"
                    : "inline-flex rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700"
                }
              >
                {clienteSeleccionado.activo
                  ? "Activo"
                  : "Inactivo"}
              </span>
            </dd>
          </div>

          <div className="border-b border-slate-200 px-5 py-4 sm:border-b-0 sm:border-r">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Fecha de registro
            </dt>

            <dd className="mt-1 text-sm text-slate-700">
              {formatearFecha(
                clienteSeleccionado.creado_en,
              )}
            </dd>
          </div>

          <div className="px-5 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Última actualización
            </dt>

            <dd className="mt-1 text-sm text-slate-700">
              {formatearFecha(
                clienteSeleccionado.actualizado_en,
              )}
            </dd>
          </div>
        </dl>
      </section>

      {clienteSeleccionado.usuario_detalle && (
        <section className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-900">
            Acceso al portal
          </h2>

          <p className="mt-1 text-sm text-blue-700">
            Este cliente posee una cuenta registrada
            en el sistema.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Usuario
              </p>

              <p className="mt-1 text-sm text-blue-900">
                {
                  clienteSeleccionado
                    .usuario_detalle.username
                }
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Correo de la cuenta
              </p>

              <p className="mt-1 break-all text-sm text-blue-900">
                {
                  clienteSeleccionado
                    .usuario_detalle.email
                }
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}