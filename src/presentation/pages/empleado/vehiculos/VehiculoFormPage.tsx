import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import type {
  FormEvent,
} from "react";

import type {
  VehiculoEmpleadoFormData,
} from "@/domain/entities/vehiculo.entity";

import VehiculoForm, {
  type VehiculoSelectOption,
} from "@/presentation/pages/empleado/vehiculos/VehiculoForm";

import {
  useVehiculoStore,
} from "@/presentation/store/vehiculo.store";

import {
  useClienteStore,
} from "@/presentation/store/cliente.store";

import {
  useMarcaStore,
} from "@/presentation/store/marca.store";

import {
  useModeloVehiculoStore,
} from "@/presentation/store/modelo-vehiculo.store";

interface VehiculoFormLocationState {
  nuevoClienteId?: number;
}

const initialFormData: VehiculoEmpleadoFormData = {
  cliente: 0,
  modelo_vehiculo: 0,
  placa: "",
  anio: new Date().getFullYear(),
  color: "",
  kilometraje_actual: 0,
  numero_chasis: "",
  activo: true,
};

export default function VehiculoFormPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationState =
    location.state as
      | VehiculoFormLocationState
      | null;

  const {
    create,
    loading,
    error,
    clearError,
  } = useVehiculoStore();

  const {
    clientes,
    getClientes,
    loading: loadingClientes,
  } = useClienteStore();

  const {
    marcas,
    getAll: getMarcas,
    isLoading: loadingMarcas,
  } = useMarcaStore();

  const {
    modelos,
    getAll: getModelos,
    isLoading: loadingModelos,
  } = useModeloVehiculoStore();

  const [
    formData,
    setFormData,
  ] = useState<VehiculoEmpleadoFormData>(
    initialFormData,
  );

  const [
    marcaSeleccionada,
    setMarcaSeleccionada,
  ] = useState(0);

  const nuevoClienteId =
    navigationState?.nuevoClienteId;

  useEffect(() => {
    void getClientes();
    void getMarcas();
    void getModelos();
  }, [
    getClientes,
    getMarcas,
    getModelos,
  ]);

  useEffect(() => {
    if (
      nuevoClienteId &&
      clientes.length > 0
    ) {
      const existe = clientes.some(
        (c) => c.id === nuevoClienteId,
      );

      if (existe) {
        setFormData((currentData) => ({
          ...currentData,
          cliente: nuevoClienteId,
        }));

        window.history.replaceState(
          {},
          "",
        );
      }
    }
  }, [
    nuevoClienteId,
    clientes,
  ]);

  const clienteOptions =
    useMemo<VehiculoSelectOption[]>(
      () =>
        clientes.map((cliente) => ({
          value: cliente.id,
          label: `${cliente.nombres} ${cliente.apellidos}`,
        })),
      [clientes],
    );

  const marcaOptions =
    useMemo<VehiculoSelectOption[]>(
      () =>
        marcas.map((marca) => ({
          value: marca.id,
          label: marca.nombre,
        })),
      [marcas],
    );

  const modeloOptions =
    useMemo<VehiculoSelectOption[]>(
      () =>
        modelos
          .filter(
            (modelo) =>
              modelo.marca ===
              marcaSeleccionada,
          )
          .map((modelo) => ({
            value: modelo.id,
            label: modelo.nombre,
          })),
      [
        modelos,
        marcaSeleccionada,
      ],
    );

  const handleChange = (
    field: keyof VehiculoEmpleadoFormData,
    value: string | number | boolean,
  ): void => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  };

  const handleMarcaChange = (
    marcaId: number,
  ): void => {
    setMarcaSeleccionada(marcaId);

    setFormData((currentData) => ({
      ...currentData,
      modelo_vehiculo: 0,
    }));
  };

  const handleMarcaCreada = (
    marcaId: number,
  ): void => {
    void getMarcas();

    setMarcaSeleccionada(marcaId);

    setFormData((currentData) => ({
      ...currentData,
      modelo_vehiculo: 0,
    }));
  };

  const handleModeloCreado = (
    modeloId: number,
  ): void => {
    void getModelos();

    setFormData((currentData) => ({
      ...currentData,
      modelo_vehiculo: modeloId,
    }));
  };

  const handleCrearCliente = (): void => {
    navigate(
      "/empleado/clientes/nuevo",
      {
        state: {
          returnTo:
            "/empleado/vehiculos/nuevo",
          fromVehicleForm: true,
        },
      },
    );
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    clearError();

    const success = await create(
      formData,
    );

    if (success) {
      navigate("/empleado/vehiculos");
    }
  };

  const handleCancel = (): void => {
    clearError();
    navigate("/empleado/vehiculos");
  };

  const loadingOptions =
    loadingClientes ||
    loadingMarcas ||
    loadingModelos;

  return (
    <section>
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={clearError}
              className="text-sm font-medium text-red-700 hover:text-red-900"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <VehiculoForm
        titulo="Registrar vehículo"
        descripcion="Asigna un vehículo a un cliente registrado en el taller."
        textoBoton="Registrar vehículo"
        formData={formData}
        clienteOptions={clienteOptions}
        marcaOptions={marcaOptions}
        modeloOptions={modeloOptions}
        marcaSeleccionada={
          marcaSeleccionada
        }
        loading={loading}
        loadingOptions={loadingOptions}
        onChange={handleChange}
        onMarcaChange={
          handleMarcaChange
        }
        onMarcaCreada={
          handleMarcaCreada
        }
        onModeloCreado={
          handleModeloCreado
        }
        onCrearCliente={
          handleCrearCliente
        }
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </section>
  );
}