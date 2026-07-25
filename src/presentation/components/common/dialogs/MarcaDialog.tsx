import {
  type FormEvent,
  useState,
} from "react";

import { Plus } from "lucide-react";

import type { MarcaFormData } from "@/domain/entities/marca.entity";

import { useMarcaStore } from "@/presentation/store/marca.store";

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

interface MarcaDialogProps {
  onMarcaCreada: (marcaId: number) => void;
}

const initialFormData: MarcaFormData = {
  nombre: "",
  pais_origen: "",
  activa: true,
};

export default function MarcaDialog({
  onMarcaCreada,
}: MarcaDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] =
    useState<MarcaFormData>(initialFormData);

  const marcas = useMarcaStore(
    (state) => state.marcas,
  );
  const isLoading = useMarcaStore(
    (state) => state.isLoading,
  );
  const error = useMarcaStore(
    (state) => state.error,
  );
  const createMarca = useMarcaStore(
    (state) => state.create,
  );
  const clearError = useMarcaStore(
    (state) => state.clearError,
  );

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
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

    const existeMarca = marcas.some(
      (m) =>
        m.nombre.toLowerCase() ===
        nombreLimpio.toLowerCase(),
    );

    if (existeMarca) {
      return;
    }

    const exito = await createMarca({
      ...formData,
      nombre: nombreLimpio,
      pais_origen:
        formData.pais_origen.trim(),
    });

    if (exito) {
      const marcasActualizadas =
        useMarcaStore.getState().marcas;

      const marcaCreada =
        marcasActualizadas.find(
          (m) =>
            m.nombre.toLowerCase() ===
            nombreLimpio.toLowerCase(),
        );

      if (marcaCreada) {
        onMarcaCreada(marcaCreada.id);
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
        >
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Nueva marca
          </DialogTitle>

          <DialogDescription>
            Registra una marca que no exista en
            el sistema.
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
              htmlFor="marca-nombre"
              className="text-sm font-medium text-slate-700"
            >
              Nombre de la marca *
            </Label>

            <Input
              id="marca-nombre"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ejemplo: Toyota"
              maxLength={100}
              disabled={isLoading}
              className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="marca-pais"
              className="text-sm font-medium text-slate-700"
            >
              País de origen
            </Label>

            <Input
              id="marca-pais"
              name="pais_origen"
              type="text"
              value={formData.pais_origen}
              onChange={handleChange}
              placeholder="Ejemplo: Japón"
              maxLength={100}
              disabled={isLoading}
              className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
            />
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
                : "Crear marca"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
