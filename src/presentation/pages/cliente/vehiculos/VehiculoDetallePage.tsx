
import { useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Car,
  Gauge,
  Hash,
  Palette,
  Pencil,
  Tag,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useVehiculoStore } from "@/presentation/store/vehiculo.store";

interface DetailItemProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

function DetailItem({
  label,
  value,
  icon,
}: DetailItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:border-slate-300 hover:bg-slate-50">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>

        <p className="mt-1 break-words font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function VehiculoDetallePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const vehiculo = useVehiculoStore(
    (state) => state.vehiculo,
  );

  const loading = useVehiculoStore(
    (state) => state.loading,
  );

  const error = useVehiculoStore(
    (state) => state.error,
  );

  const getById = useVehiculoStore(
    (state) => state.getById,
  );

  const clearVehiculo = useVehiculoStore(
    (state) => state.clearVehiculo,
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    void getById(Number(id));

    return () => {
      clearVehiculo();
    };
  }, [id, getById, clearVehiculo]);

  if (!id || Number.isNaN(Number(id))) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">
              Vehículo no válido
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <Button
              onClick={() =>
                navigate("/cliente/vehiculos")
              }
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Volver a vehículos
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <p className="text-center text-sm font-medium text-slate-600">
              Cargando vehículo...
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border-red-200 shadow-sm">
          <CardHeader className="border-b border-red-200 bg-red-50">
            <CardTitle className="text-xl text-red-800">
              No se pudo cargar el vehículo
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 p-6">
            <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </p>

            <Button
              variant="outline"
              onClick={() =>
                navigate("/cliente/vehiculos")
              }
              className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!vehiculo) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">
              Vehículo no encontrado
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <Button
              variant="outline"
              onClick={() =>
                navigate("/cliente/vehiculos")
              }
              className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Detalle del vehículo
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Consulta la información registrada del vehículo.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            onClick={() =>
              navigate("/cliente/vehiculos")
            }
            className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>

          <Button
            onClick={() =>
              navigate(
                `/cliente/vehiculos/${vehiculo.id}/editar`,
              )
            }
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </header>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50">
          <CardTitle className="flex items-center gap-3 text-xl text-slate-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Car className="h-5 w-5" />
            </span>

            <span>
              {vehiculo.marca_nombre}{" "}
              {vehiculo.modelo_nombre}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem
            label="Placa"
            value={vehiculo.placa}
            icon={<Tag className="h-5 w-5" />}
          />

          <DetailItem
            label="Modelo"
            value={vehiculo.modelo_nombre}
            icon={<Car className="h-5 w-5" />}
          />

          <DetailItem
            label="Marca"
            value={vehiculo.marca_nombre}
            icon={<Tag className="h-5 w-5" />}
          />

          <DetailItem
            label="Año"
            value={vehiculo.anio}
            icon={<Calendar className="h-5 w-5" />}
          />

          <DetailItem
            label="Color"
            value={vehiculo.color}
            icon={<Palette className="h-5 w-5" />}
          />

          <DetailItem
            label="Kilometraje"
            value={`${vehiculo.kilometraje_actual.toLocaleString()} km`}
            icon={<Gauge className="h-5 w-5" />}
          />

          <DetailItem
            label="Número de chasis"
            value={vehiculo.numero_chasis}
            icon={<Hash className="h-5 w-5" />}
          />

          <DetailItem
            label="Estado"
            value={
              vehiculo.activo
                ? "Activo"
                : "Inactivo"
            }
            icon={<Car className="h-5 w-5" />}
          />
        </CardContent>
      </Card>
    </main>
  );
}

