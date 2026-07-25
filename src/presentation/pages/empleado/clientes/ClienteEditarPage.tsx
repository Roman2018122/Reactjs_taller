import {
  useEffect,
  useState,
} from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import type {
  ClienteFormData,
} from "@/domain/entities/cliente.entity";

import ClienteForm from "./ClienteForm";
import { useClienteStore } from "@/presentation/store/cliente.store";

const emptyValues: ClienteFormData = {
  nombres: "",
  apellidos: "",
  identificacion: "",
  telefono: "",
  email: "",
  direccion: "",
  activo: true,
};

export default function ClienteEditarPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const clienteId = Number(id);

  const {
    clienteSeleccionado,
    loading,
    error,
    getClienteById,
    updateCliente,
    clearClienteSeleccionado,
    clearError,
  } = useClienteStore();

  const [formData, setFormData] =
    useState<ClienteFormData>(emptyValues);

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

  useEffect(() => {
    if (
      !clienteSeleccionado ||
      clienteSeleccionado.id !== clienteId
    ) {
      return;
    }

    setFormData({
      nombres: clienteSeleccionado.nombres,
      apellidos: clienteSeleccionado.apellidos,
      identificacion:
        clienteSeleccionado.identificacion ?? "",
      telefono: clienteSeleccionado.telefono,
      email: clienteSeleccionado.email,
      direccion: clienteSeleccionado.direccion,
      activo: clienteSeleccionado.activo,
    });
  }, [clienteSeleccionado, clienteId]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ): void => {
    const target = event.target;

    if (
      target instanceof HTMLInputElement &&
      target.type === "checkbox"
    ) {
      setFormData((previous) => ({
        ...previous,
        [target.name]: target.checked,
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    clearError();

    const actualizado = await updateCliente(
      clienteId,
      {
        nombres: formData.nombres.trim(),
        apellidos:
          formData.apellidos.trim(),
        identificacion:
          formData.identificacion.trim() || null,
        telefono:
          formData.telefono.trim(),
        email: formData.email.trim(),
        direccion:
          formData.direccion.trim(),
        activo: formData.activo,
      },
    );

    if (actualizado) {
      navigate("/empleado/clientes");
    }
  };

  const handleCancel = (): void => {
    clearError();
    navigate("/empleado/clientes");
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
            onClick={handleCancel}
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
            No se pudo cargar el cliente
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
              onClick={handleCancel}
              className="rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
            >
              Volver
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
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

      <ClienteForm
        titulo="Editar cliente"
        descripcion="Modifica la información registrada del cliente."
        textoBoton="Guardar cambios"
        formData={formData}
        loading={loading}
        onChange={handleChange}
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
        onCancel={handleCancel}
      />
    </main>
  );
}
