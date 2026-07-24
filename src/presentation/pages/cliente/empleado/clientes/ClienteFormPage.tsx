import {
  useEffect,
  useState,
} from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import { useNavigate } from "react-router-dom";

import type {
  ClienteFormData,
} from "@/domain/entities/cliente.entity";

import ClienteForm from "./ClienteForm";
import { useClienteStore } from "@/presentation/store/cliente.store";

const initialValues: ClienteFormData = {
  nombres: "",
  apellidos: "",
  identificacion: "",
  telefono: "",
  email: "",
  direccion: "",
  activo: true,
};

export default function ClienteFormPage() {
  const navigate = useNavigate();

  const {
    createCliente,
    loading,
    error,
    clearError,
  } = useClienteStore();

  const [formData, setFormData] =
    useState<ClienteFormData>(
      initialValues,
    );

  useEffect(() => {
    clearError();
  }, [clearError]);

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

    const cliente = await createCliente({
      ...formData,
      nombres: formData.nombres.trim(),
      apellidos:
        formData.apellidos.trim(),
      identificacion:
        formData.identificacion.trim(),
      telefono:
        formData.telefono.trim(),
      email: formData.email.trim(),
      direccion:
        formData.direccion.trim(),
    });

    if (!cliente) {
      return;
    }

    navigate("/empleado/clientes");
  };

  const handleCancel = (): void => {
    navigate("/empleado/clientes");
  };

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
        titulo="Registrar cliente"
        descripcion="Registra un cliente presencial que será atendido directamente en el taller."
        textoBoton="Guardar cliente"
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