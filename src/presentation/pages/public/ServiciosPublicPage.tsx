import {
  useNavigate,
} from "react-router-dom";

import {
  serviceRequestStorage,
} from "@/infrastructure/storage/service-request-storage";

import {
  useAuthStore,
} from "@/presentation/store/auth.store";

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
  CardFooter,
  
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
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user,
  );
  function handleSolicitarServicio(
    servicioId: number,
    servicioNombre: string,
  ): void {
    serviceRequestStorage.save({
      servicioId,
      servicioNombre,
    });

    if (!user) {
      navigate("/login", {
        state: {
          message:
            "Inicia sesión o regístrate para solicitar este servicio.",
        },
      });

      return;
    }

    navigate(
      "/cliente/solicitar-servicio",
    );
  }

  return (
  <main>
    {/* Presentación del catálogo */}
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50" />

      <div className="absolute -right-32 -top-40 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Badge
              variant="secondary"
              className="border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700"
            >
              Catálogo del taller
            </Badge>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Servicios para el cuidado de{" "}
              <span className="text-blue-600">
                tu vehículo
              </span>
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Explora nuestros servicios, consulta precios
              referenciales y solicita atención para tu vehículo.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="w-full bg-blue-600 font-semibold text-white shadow-md hover:bg-blue-700 sm:w-auto"
          >
            <Link to="/registro">
              Agendar una cita

              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Catálogo */}
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        {/* Panel lateral */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <div>
                <p className="font-semibold text-slate-900">
                  Buscar servicios
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Busca por nombre o descripción.
                </p>
              </div>

              <div className="relative mt-4">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  aria-label="Buscar servicios"
                  className="h-11 border-slate-300 bg-white pl-10 text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  placeholder="Ej. cambio de aceite"
                  value={search}
                  onChange={(event) => {
                    setSearch(
                      event.target.value,
                    );
                  }}
                />
              </div>

              {!loading && !error && (
                <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <p className="text-sm font-medium text-blue-900">
                    {serviciosFiltrados.length}{" "}
                    {serviciosFiltrados.length === 1
                      ? "servicio disponible"
                      : "servicios disponibles"}
                  </p>
                </div>
              )}

              {search && (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 w-full border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  Limpiar búsqueda
                </Button>
              )}
            </CardContent>
          </Card>
        </aside>

        {/* Resultados */}
        <div className="min-w-0">
          {loading && (
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="flex min-h-64 flex-col items-center justify-center gap-4 p-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

                <div>
                  <p className="font-semibold text-slate-900">
                    Cargando servicios
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Estamos consultando el catálogo del taller.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {!loading && error && (
            <Card className="border-red-200 bg-white shadow-sm">
              <CardContent className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <Wrench className="h-7 w-7" />
                </div>

                <p className="mt-4 font-semibold text-red-700">
                  No se pudieron cargar los servicios
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                  {error}
                </p>

                <Button
                  type="button"
                  className="mt-5 bg-blue-600 font-semibold text-white hover:bg-blue-700"
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
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Search className="h-7 w-7" />
                  </div>

                  <p className="mt-4 font-semibold text-slate-900">
                    No se encontraron servicios
                  </p>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    No existen servicios que coincidan con la
                    búsqueda ingresada.
                  </p>

                  {search && (
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-5 border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      onClick={() => {
                        setSearch("");
                      }}
                    >
                      Mostrar todos
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

          {!loading &&
            !error &&
            serviciosFiltrados.length > 0 && (
              <>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                      Servicios disponibles
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Selecciona el servicio que necesita tu vehículo.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {serviciosFiltrados.map(
                    (servicio) => (
                      <Card
                        key={servicio.id}
                        className="group flex h-full flex-col overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                      >
                        <CardContent className="flex flex-1 flex-col gap-4 p-5">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                                Precio referencial
                              </p>

                              <p className="mt-2 text-lg font-bold text-blue-950">
                                {formatCurrency(
                                  servicio.precio_referencial,
                                )}
                              </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                              <div className="flex items-center gap-2 text-slate-500">
                                <Clock3 className="h-4 w-4 text-blue-600" />

                                <p className="text-xs font-semibold uppercase tracking-wide">
                                  Duración
                                </p>
                              </div>

                              <p className="mt-2 text-sm font-semibold text-slate-900">
                                {formatDuration(
                                  servicio.duracion_estimada,
                                )}
                              </p>
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter className="border-t border-slate-100 bg-white p-5">
                          <Button
                            type="button"
                            className="w-full bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-700"
                            onClick={() => {
                              handleSolicitarServicio(
                                servicio.id,
                                servicio.nombre,
                              );
                            }}
                          >
                            Solicitar servicio

                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ),
                  )}
                </div>
              </>
            )}
        </div>
      </div>
    </section>

    {/* CTA compacto */}
    <section className="border-t border-slate-200 bg-slate-100/70">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-slate-800 bg-slate-950 shadow-xl">
          <CardContent className="relative flex flex-col gap-6 overflow-hidden p-7 text-white sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-600/30" />

            <div className="relative max-w-2xl">
              <Badge className="border border-blue-400/30 bg-blue-500/20 text-blue-100 hover:bg-blue-500/20">
                Atención personalizada
              </Badge>

              <h2 className="mt-4 text-2xl font-bold tracking-tight">
                ¿No sabes qué servicio necesita tu vehículo?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Agenda una cita para que nuestro equipo realice
                una revisión y te indique el servicio adecuado.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="relative w-full shrink-0 bg-blue-600 font-semibold text-white hover:bg-blue-500 sm:w-auto"
            >
              <Link to="/registro">
                Agendar revisión

                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  </main>
);}