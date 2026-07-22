import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowRight,
  Clock3,
  Loader2,
  Search,
  Wrench,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  apiClient,
} from "@/infrastructure/http/axios-client";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/presentation/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";

import {
  Input,
} from "@/presentation/components/ui/input";

interface ServicioPublico {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio_referencial: string | number | null;
  duracion_estimada: number | null;
  activo: boolean;
}

interface ServicioPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ServicioPublico[];
}

type ServicioApiResponse =
  | ServicioPublico[]
  | ServicioPaginatedResponse;

function formatCurrency(
  value: string | number | null,
): string {
  if (
    value === null ||
    value === ""
  ) {
    return "Consultar precio";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return String(value);
  }

  return new Intl.NumberFormat(
    "es-EC",
    {
      style: "currency",
      currency: "USD",
    },
  ).format(numericValue);
}

function formatDuration(
  value: number | null,
): string {
  if (
    value === null ||
    value <= 0
  ) {
    return "Duración por confirmar";
  }

  if (value < 60) {
    return `${value} minutos`;
  }

  const hours = Math.floor(
    value / 60,
  );

  const minutes = value % 60;

  if (minutes === 0) {
    return hours === 1
      ? "1 hora"
      : `${hours} horas`;
  }

  return `${hours} h ${minutes} min`;
}

function extractServicios(
  response: ServicioApiResponse,
): ServicioPublico[] {
  if (Array.isArray(response)) {
    return response;
  }

  return response.results;
}

function extractErrorMessage(
  error: unknown,
): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "No se pudieron cargar los servicios.";
}

export default function ServiciosPublicPage() {
  const [servicios, setServicios] =
    useState<ServicioPublico[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadServicios = async () => {
    setLoading(true);
    setError(null);

    try {
      const response =
        await apiClient.get<ServicioApiResponse>(
          "/servicios/",
        );

      const serviciosObtenidos =
        extractServicios(
          response.data,
        ).filter(
          (servicio) =>
            servicio.activo,
        );

      setServicios(
        serviciosObtenidos,
      );
    } catch (requestError: unknown) {
      setError(
        extractErrorMessage(
          requestError,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadServicios();
  }, []);

  const serviciosFiltrados =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLocaleLowerCase(
            "es-EC",
          );

      if (!normalizedSearch) {
        return servicios;
      }

      return servicios.filter(
        (servicio) => {
          const nombre =
            servicio.nombre
              .toLocaleLowerCase(
                "es-EC",
              );

          const descripcion =
            servicio.descripcion
              ?.toLocaleLowerCase(
                "es-EC",
              ) ?? "";

          return (
            nombre.includes(
              normalizedSearch,
            ) ||
            descripcion.includes(
              normalizedSearch,
            )
          );
        },
      );
    }, [
      search,
      servicios,
    ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Wrench className="h-5 w-5" />
            </div>

            <div>
              <p className="font-bold leading-none tracking-tight text-slate-900">
                AutoCenter
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Servicio automotriz
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              Inicio
            </Link>

            <Link
              to="/servicios"
              className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
            >
              Servicios
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="hidden font-semibold text-slate-700 hover:bg-slate-100 sm:inline-flex"
            >
              <Link to="/login">
                Iniciar sesión
              </Link>
            </Button>

            <Button
              asChild
              className="bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <Link to="/registro">
                Registrarse
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50" />

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

          <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-slate-200/60 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <Badge
              variant="secondary"
              className="border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700"
            >
              Catálogo del taller
            </Badge>

            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:leading-[1.1]">
                  Servicios para el cuidado de{" "}
                  <span className="text-blue-600">
                    tu vehículo
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                  Conoce los servicios disponibles
                  antes de solicitar una cita con
                  nuestro taller.
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="w-full bg-blue-600 font-semibold text-white shadow-md hover:bg-blue-700 sm:w-auto"
              >
                <Link to="/registro">
                  Solicitar una cita

                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  aria-label="Buscar servicios"
                  className="h-12 border-slate-300 bg-white pl-12 text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  placeholder="Buscar por nombre o descripción..."
                  value={search}
                  onChange={(event) => {
                    setSearch(
                      event.target.value,
                    );
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {loading && (
            <div className="flex min-h-80 items-center justify-center">
              <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white px-10 py-12 text-center shadow-sm">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

                <span className="text-sm font-medium text-slate-600">
                  Cargando servicios...
                </span>
              </div>
            </div>
          )}

          {!loading && error && (
            <Card className="mt-8 overflow-hidden border-red-200 bg-white shadow-sm">
              <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <Wrench className="h-7 w-7" />
                </div>

                <p className="font-semibold text-red-700">
                  No se pudieron cargar los servicios
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                  {error}
                </p>

                <Button
                  type="button"
                  className="mt-5 bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-700"
                  onClick={() => {
                    void loadServicios();
                  }}
                >
                  Intentar nuevamente
                </Button>
              </CardContent>
            </Card>
          )}

          {!loading &&
            !error &&
            serviciosFiltrados.length === 0 && (
              <Card className="mt-8 overflow-hidden border-slate-200 bg-white shadow-sm">
                <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Wrench className="h-7 w-7" />
                  </div>

                  <p className="font-semibold text-slate-900">
                    No se encontraron servicios
                  </p>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    No existen servicios que coincidan
                    con la búsqueda ingresada.
                  </p>

                  {search && (
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-5 border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      onClick={() => {
                        setSearch("");
                      }}
                    >
                      Limpiar búsqueda
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

          {!loading &&
            !error &&
            serviciosFiltrados.length > 0 && (
              <>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <Badge
                      variant="outline"
                      className="border-blue-200 bg-blue-50 text-blue-700"
                    >
                      Catálogo disponible
                    </Badge>

                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Servicios disponibles
                    </h2>

                    <p className="mt-2 text-sm text-slate-600">
                      {serviciosFiltrados.length} servicios encontrados
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {serviciosFiltrados.map(
                    (servicio) => (
                      <Card
                        key={servicio.id}
                        className="group flex h-full flex-col overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                      >
                        <CardHeader className="border-b border-slate-200 bg-slate-50 p-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                            <Wrench className="h-6 w-6" />
                          </div>

                          <CardTitle className="pt-4 text-xl font-bold text-slate-900">
                            {servicio.nombre}
                          </CardTitle>

                          <CardDescription className="line-clamp-3 leading-6 text-slate-600">
                            {servicio.descripcion ||
                              "Servicio automotriz disponible en nuestro taller."}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="flex flex-1 flex-col gap-5 p-6">
                          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                            <p className="text-sm font-medium text-blue-700">
                              Precio base
                            </p>

                            <p className="mt-2 text-xl font-bold text-blue-900">
                              {formatCurrency(
                                servicio.precio_referencial,
                              )}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                              <Clock3 className="h-4 w-4" />
                            </div>

                            <span className="font-medium">
                              {formatDuration(
                                servicio.duracion_estimada,
                              )}
                            </span>
                          </div>
                        </CardContent>

                        <CardFooter className="border-t border-slate-200 bg-white p-6 pt-5">
                          <Button
                            asChild
                            className="w-full bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-700"
                          >
                            <Link to="/registro">
                              Solicitar servicio

                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ),
                  )}
                </div>
              </>
            )}
        </section>

        <section className="border-t border-slate-200 bg-slate-100/70">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <Card className="overflow-hidden border-slate-200 bg-white shadow-xl">
              <CardContent className="relative flex flex-col items-start justify-between gap-8 overflow-hidden bg-slate-900 p-8 text-white md:flex-row md:items-center sm:p-10">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30" />

                <div className="absolute -bottom-28 left-24 h-56 w-56 rounded-full bg-blue-500/20" />

                <div className="relative max-w-2xl">
                  <Badge className="border border-blue-400/30 bg-blue-500/20 text-blue-100 hover:bg-blue-500/20">
                    Agenda tu visita
                  </Badge>

                  <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                    ¿Necesitas uno de estos servicios?
                  </h2>

                  <p className="mt-3 leading-7 text-slate-300">
                    Crea una cuenta, registra tu vehículo
                    y agenda una cita con el taller.
                  </p>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="relative w-full shrink-0 bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
                >
                  <Link to="/registro">
                    Crear cuenta

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Wrench className="h-4 w-4" />
            </div>

            <p className="font-semibold text-white">
              AutoCenter
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm">
            <Link
              to="/"
              className="transition-colors hover:text-white"
            >
              Inicio
            </Link>

            <Link
              to="/servicios"
              className="transition-colors hover:text-white"
            >
              Servicios
            </Link>

            <Link
              to="/login"
              className="transition-colors hover:text-white"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}