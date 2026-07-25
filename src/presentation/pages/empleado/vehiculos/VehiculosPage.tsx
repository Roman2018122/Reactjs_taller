import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import {
  useVehiculoStore,
} from "@/presentation/store/vehiculo.store";
import { toast } from "@/presentation/store/toast.store";
import ConfirmDeleteDialog from "@/presentation/components/common/ConfirmDeleteDialog";

export default function VehiculosPage() {
  const navigate = useNavigate();

  const {
    vehiculos,
    count,
    loading,
    error,
    getPaginated,
    remove,
    clearError,
  } = useVehiculoStore();

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [vehiculoToDelete, setVehiculoToDelete] =
    useState<{ id: number; placa: string } | null>(null);

  useEffect(() => {
    void getPaginated({
      search,
      ordering: "placa",
      page,
    });
  }, [
    getPaginated,
    search,
    page,
  ]);

  const handleDeleteClick = (
    id: number,
    placa: string,
  ): void => {
    setVehiculoToDelete({ id, placa });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!vehiculoToDelete) {
      return;
    }

    const success = await remove(vehiculoToDelete.id);

    setDeleteDialogOpen(false);
    setVehiculoToDelete(null);

    if (success) {
      toast.success(`Vehículo ${vehiculoToDelete.placa} eliminado correctamente.`);
      void getPaginated({
        search,
        ordering: "placa",
        page,
      });
    } else {
      toast.error(
        "No se puede eliminar el vehículo porque tiene citas, órdenes o historial asociado.",
      );
    }
  };

  const handlePreviousPage = (): void => {
    if (page > 1) {
      setPage((currentPage) =>
        currentPage - 1
      );
    }
  };

  const handleNextPage = (): void => {
    setPage((currentPage) =>
      currentPage + 1
    );
  };

  return (
    <section>
      <header className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Vehículos
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Gestiona los vehículos registrados en el
            taller.
          </p>
        </div>

        <Link
          to="/empleado/vehiculos/nuevo"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />

          Registrar vehículo
        </Link>
      </header>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <label
          htmlFor="search"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Buscar vehículo
        </label>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            id="search"
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Buscar por placa, cliente, marca o modelo"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

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

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Placa
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Cliente
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Vehículo
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Año
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Kilometraje
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Estado
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {loading && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    Cargando vehículos...
                  </td>
                </tr>
              )}

              {!loading &&
                vehiculos.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center text-sm text-slate-500"
                    >
                      No se encontraron vehículos.
                    </td>
                  </tr>
                )}

              {!loading &&
                vehiculos.map((vehiculo) => (
                  <tr
                    key={vehiculo.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-900">
                      {vehiculo.placa}
                    </td>

                    <td className="px-5 py-4 text-sm text-red-600 font-bold">
                      {vehiculo.cliente_nombre}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      <span className="font-medium text-slate-900">
                        {vehiculo.marca_nombre}
                      </span>

                      {" "}

                      {vehiculo.modelo_nombre}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                      {vehiculo.anio}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                      {vehiculo.kilometraje_actual.toLocaleString(
                        "es-EC",
                      )}{" "}
                      km
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={
                          vehiculo.activo
                            ? "inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                            : "inline-flex rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700"
                        }
                      >
                        {vehiculo.activo
                          ? "Activo"
                          : "Inactivo"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            navigate(
                              `/empleado/vehiculos/${vehiculo.id}`,
                            );
                          }}
                          className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                          aria-label={`Ver vehículo ${vehiculo.placa}`}
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            navigate(
                              `/empleado/vehiculos/${vehiculo.id}/editar`,
                            );
                          }}
                          className="rounded-lg border border-blue-200 p-2 text-blue-600 transition hover:bg-blue-50 hover:text-blue-800"
                          aria-label={`Editar vehículo ${vehiculo.placa}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            handleDeleteClick(
                              vehiculo.id,
                              vehiculo.placa,
                            );
                          }}
                          disabled={loading}
                          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={`Eliminar vehículo ${vehiculo.placa}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Total de vehículos:{" "}
            <span className="font-semibold text-slate-900">
              {count}
            </span>
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePreviousPage}
              disabled={page === 1 || loading}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="text-sm font-medium text-slate-700">
              Página {page}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={
                loading ||
                vehiculos.length === 0 ||
                count <= page * 10
              }
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </footer>
      </div>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Eliminar vehículo"
        description={
          vehiculoToDelete
            ? `¿Estás seguro de que deseas eliminar el vehículo ${vehiculoToDelete.placa}? Esta acción no se puede deshacer.`
            : ""
        }
        loading={loading}
        onConfirm={() => {
          void handleConfirmDelete();
        }}
        onCancel={() => {
          setVehiculoToDelete(null);
        }}
      />
    </section>
  );
}