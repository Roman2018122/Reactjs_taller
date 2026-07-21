
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  ClipboardList,
  Eye,
  Search,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import type {
  EstadoOrdenTrabajo,
  OrdenTrabajo,
} from "@/domain/entities/orden-trabajo.entity";

import {
  useOrdenTrabajoStore,
} from "@/presentation/store/orden-trabajo.store";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/presentation/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";

import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ALL_STATES_VALUE = "TODOS";

function formatDate(value: string | null): string {
  if (!value) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-EC", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function getEstadoBadgeVariant(
  estado: EstadoOrdenTrabajo,
): "default" | "secondary" | "destructive" | "outline" {
  switch (estado) {
    case "ENTREGADO":
      return "default";

    case "CANCELADO":
      return "destructive";

    case "RECIBIDO":
    case "LISTO":
      return "secondary";

    default:
      return "outline";
  }
}

export default function OrdenTrabajoEmpleadoListPage() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] =
    useState("");

  const ordenes = useOrdenTrabajoStore(
    (state) => state.ordenes,
  );

  const count = useOrdenTrabajoStore(
    (state) => state.count,
  );

  const page = useOrdenTrabajoStore(
    (state) => state.page,
  );

  const search = useOrdenTrabajoStore(
    (state) => state.search,
  );

  const estado = useOrdenTrabajoStore(
    (state) => state.estado,
  );

  const next = useOrdenTrabajoStore(
    (state) => state.next,
  );

  const previous = useOrdenTrabajoStore(
    (state) => state.previous,
  );

  const loading = useOrdenTrabajoStore(
    (state) => state.loading,
  );

  const error = useOrdenTrabajoStore(
    (state) => state.error,
  );

  const getAll = useOrdenTrabajoStore(
    (state) => state.getAll,
  );

  const setPage = useOrdenTrabajoStore(
    (state) => state.setPage,
  );

  const setSearch = useOrdenTrabajoStore(
    (state) => state.setSearch,
  );

  const setEstado = useOrdenTrabajoStore(
    (state) => state.setEstado,
  );

  useEffect(() => {
    void getAll();
  }, [getAll]);

  const handleSubmitSearch = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const normalizedSearch =
      searchInput.trim();

    setSearch(normalizedSearch);
    setPage(1);

    void getAll({
      page: 1,
      search: normalizedSearch,
      estado,
    });
  };

  const handleEstadoChange = (
    value: string,
  ) => {
    const selectedEstado =
      value === ALL_STATES_VALUE
        ? ""
        : value as EstadoOrdenTrabajo;

    setEstado(selectedEstado);
    setPage(1);

    void getAll({
      page: 1,
      search,
      estado: selectedEstado,
    });
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setEstado("");
    setPage(1);

    void getAll({
      page: 1,
      search: "",
      estado: "",
    });
  };

  const handlePreviousPage = () => {
    if (!previous || page <= 1) {
      return;
    }

    const newPage = page - 1;

    setPage(newPage);

    void getAll({
      page: newPage,
      search,
      estado,
    });
  };

  const handleNextPage = () => {
    if (!next) {
      return;
    }

    const newPage = page + 1;

    setPage(newPage);

    void getAll({
      page: newPage,
      search,
      estado,
    });
  };

  const handleViewDetail = (
    orden: OrdenTrabajo,
  ) => {
    navigate(
      `/empleado/ordenes/${orden.id}`,
    );
  };

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <ClipboardList className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Órdenes de trabajo
            </h1>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Consulta las órdenes registradas en el
              taller.
            </p>
          </div>
        </div>
      </header>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">
          <CardTitle className="text-xl font-bold text-slate-900">
            Filtros de búsqueda
          </CardTitle>

          <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
            Busca por número de orden, cliente o placa
            del vehículo.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_240px_auto]">
            <form
              className="space-y-2"
              onSubmit={handleSubmitSearch}
            >
              <Label
                htmlFor="search"
                className="text-sm font-semibold text-slate-700"
              >
                Buscar
              </Label>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="search"
                  placeholder="Orden, cliente o placa"
                  value={searchInput}
                  onChange={(event) => {
                    setSearchInput(
                      event.target.value,
                    );
                  }}
                  className="h-10 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-10 bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </div>
            </form>

            <div className="space-y-2">
              <Label
                htmlFor="estado"
                className="text-sm font-semibold text-slate-700"
              >
                Estado
              </Label>

              <Select
                value={
                  estado || ALL_STATES_VALUE
                }
                onValueChange={
                  handleEstadoChange
                }
              >
                <SelectTrigger
                  id="estado"
                  className="h-10 border-slate-300 bg-white text-slate-900 focus:ring-blue-500/20"
                >
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem
                    value={ALL_STATES_VALUE}
                  >
                    Todos los estados
                  </SelectItem>

                  <SelectItem value="RECIBIDO">
                    Recibido
                  </SelectItem>

                  <SelectItem value="EN_REVISION">
                    En revisión
                  </SelectItem>

                  <SelectItem value="ESPERANDO_AUTORIZACION">
                    Esperando autorización
                  </SelectItem>

                  <SelectItem value="EN_REPARACION">
                    En reparación
                  </SelectItem>

                  <SelectItem value="EN_LAVADO">
                    En lavado
                  </SelectItem>

                  <SelectItem value="LISTO">
                    Listo
                  </SelectItem>

                  <SelectItem value="ENTREGADO">
                    Entregado
                  </SelectItem>

                  <SelectItem value="CANCELADO">
                    Cancelado
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleClearFilters}
                disabled={loading}
                className="h-10 w-full border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-100 md:w-auto"
              >
                Limpiar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardHeader className="flex flex-col gap-2 border-b border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">
              Órdenes registradas
            </CardTitle>

            <CardDescription className="mt-1 text-sm text-slate-600">
              Consulta la información y el estado de
              cada orden.
            </CardDescription>
          </div>

          <div className="w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
            Total: {count}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {error && (
            <div
              role="alert"
              className="m-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 sm:m-6"
            >
              {error}
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
              <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="text-sm font-medium text-slate-600">
                Cargando órdenes de trabajo...
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            ordenes.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <ClipboardList className="h-6 w-6" />
                </div>

                <p className="font-semibold text-slate-800">
                  No se encontraron órdenes
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Intenta modificar o limpiar los
                  filtros de búsqueda.
                </p>
              </div>
            )}

          {!loading &&
            ordenes.length > 0 && (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-100">
                      <TableRow className="border-slate-200 hover:bg-slate-100">
                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Orden
                        </TableHead>

                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Cliente
                        </TableHead>

                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Vehículo
                        </TableHead>

                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Responsable
                        </TableHead>

                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Estado
                        </TableHead>

                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Ingreso
                        </TableHead>

                        <TableHead className="whitespace-nowrap px-5 py-3 font-semibold text-slate-700">
                          Entrega estimada
                        </TableHead>

                        <TableHead className="whitespace-nowrap px-5 py-3 text-right font-semibold text-slate-700">
                          Acciones
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {ordenes.map((orden) => (
                        <TableRow
                          key={orden.id}
                          className="border-slate-200 transition-colors hover:bg-slate-50"
                        >
                          <TableCell className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900">
                            {orden.numero_orden}
                          </TableCell>

                          <TableCell className="px-5 py-4 text-slate-700">
                            {orden.cliente_nombre}
                          </TableCell>

                          <TableCell className="whitespace-nowrap px-5 py-4 font-semibold uppercase tracking-wide text-slate-700">
                            {orden.vehiculo_placa}
                          </TableCell>

                          <TableCell className="px-5 py-4 text-slate-700">
                            {orden.empleado_responsable_nombre ??
                              "Sin asignar"}
                          </TableCell>

                          <TableCell className="whitespace-nowrap px-5 py-4">
                            <Badge
                              variant={
                                getEstadoBadgeVariant(
                                  orden.estado,
                                )
                              }
                            >
                              {orden.estado_display}
                            </Badge>
                          </TableCell>

                          <TableCell className="whitespace-nowrap px-5 py-4 text-slate-600">
                            {formatDate(
                              orden.fecha_ingreso,
                            )}
                          </TableCell>

                          <TableCell className="whitespace-nowrap px-5 py-4 text-slate-600">
                            {formatDate(
                              orden.fecha_estimada_entrega,
                            )}
                          </TableCell>

                          <TableCell className="whitespace-nowrap px-5 py-4 text-right">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                handleViewDetail(
                                  orden,
                                );
                              }}
                              className="border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalle
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="text-sm font-medium text-slate-600">
                    Página {page}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={
                        handlePreviousPage
                      }
                      disabled={
                        loading ||
                        !previous ||
                        page <= 1
                      }
                      className="border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-100"
                    >
                      Anterior
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleNextPage}
                      disabled={
                        loading || !next
                      }
                      className="border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-100"
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              </>
            )}
        </CardContent>
      </Card>
    </main>
  );
}

