import {
  type FormEvent,
  useState,
} from "react";

import { Plus } from "lucide-react";

import type { ModeloVehiculoFormData } from "@/domain/entities/modelo-vehiculo.entity";

import { useModeloVehiculoStore } from "@/presentation/store/modelo-vehiculo.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModeloDialogProps {
  marcaId: number;
  onModeloCreado: (modeloId: number) => void;
}

const initialFormData: Omit<
  ModeloVehiculoFormData,
  "marca"
> = {
  nombre: "",
  tipo_vehiculo: "AUTOMOVIL",
  activo: true,
};

export default function ModeloDialog({
  marcaId,
  onModeloCreado,
}: ModeloDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] =
    useState(initialFormData);

  const modelos = useModeloVehiculoStore(
    (state) => state.modelos,
  );
  const isLoading = useModeloVehiculoStore(
    (state) => state.isLoading,
  );
  const error = useModeloVehiculoStore(
    (state) => state.error,
  );
  const createModelo = useModeloVehiculoStore(
    (state) => state.create,
  );
  const clearError = useModeloVehiculoStore(
    (state) => state.clearError,
  );

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ): void {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleOpenChange(
    nextOpen: boolean,
  ): void {
    setOpen(nextOpen);

    if (!nextOpen) {
      setFormData(initialFormData);
      clearError();
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const nombreLimpio =
      formData.nombre.trim();

    if (nombreLimpio === "") {
      return;
    }

    const existeModelo = modelos.some(
      (m) =>
        m.marca === marcaId &&
        m.nombre.toLowerCase() ===
          nombreLimpio.toLowerCase(),
    );

    if (existeModelo) {
      return;
    }

    const exito = await createModelo({
      marca: marcaId,
      nombre: nombreLimpio,
      tipo_vehiculo: formData.tipo_vehiculo,
      activo: formData.activo,
    });

    if (exito) {
      const modelosActualizados =
        useModeloVehiculoStore.getState()
          .modelos;

      const modeloCreado =
        modelosActualizados.find(
          (m) =>
            m.marca === marcaId &&
            m.nombre.toLowerCase() ===
              nombreLimpio.toLowerCase(),
        );

      if (modeloCreado) {
        onModeloCreado(modeloCreado.id);
      }

      setOpen(false);
      setFormData(initialFormData);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="shrink-0"
          disabled={marcaId === 0}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Nuevo modelo
          </DialogTitle>

          <DialogDescription>
            Registra un modelo para esta marca
            que no exista en el sistema.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700"
          >
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label
              htmlFor="modelo-nombre"
              className="text-sm font-medium text-slate-700"
            >
              Nombre del modelo *
            </Label>

            <Input
              id="modelo-nombre"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ejemplo: Corolla"
              maxLength={100}
              disabled={isLoading}
              className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="modelo-tipo"
              className="text-sm font-medium text-slate-700"
            >
              Tipo de vehículo
            </Label>

            <select
              id="modelo-tipo"
              name="tipo_vehiculo"
              value={formData.tipo_vehiculo}
              onChange={handleChange}
              disabled={isLoading}
              className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value="AUTOMOVIL">
                Automóvil
              </option>

              <option value="CAMIONETA">
                Camioneta
              </option>

              <option value="CAMION">
                Camión
              </option>

              <option value="MOTOCICLETA">
                Motocicleta
              </option>

              <option value="OTRO">
                Otro
              </option>
            </select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setOpen(false)
              }
              disabled={isLoading}
              className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={
                isLoading ||
                formData.nombre.trim() === ""
              }
              className="bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading
                ? "Guardando..."
                : "Crear modelo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
