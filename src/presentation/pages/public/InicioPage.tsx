import {
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/presentation/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";

const benefits = [
  {
    title: "Atención profesional",
    description:
      "Personal capacitado para revisar, diagnosticar y reparar tu vehículo.",
    icon: ShieldCheck,
  },
  {
    title: "Seguimiento del vehículo",
    description:
      "Consulta el avance de la reparación desde tu cuenta de cliente.",
    icon: Car,
  },
  {
    title: "Servicios confiables",
    description:
      "Trabajos registrados y organizados dentro de cada orden de servicio.",
    icon: Wrench,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Agenda una cita",
    description:
      "Selecciona tu vehículo, la fecha disponible y explica el motivo de la visita.",
  },
  {
    number: "02",
    title: "Recibimos tu vehículo",
    description:
      "El personal del taller revisa la información y genera una orden de trabajo.",
  },
  {
    number: "03",
    title: "Revisión y diagnóstico",
    description:
      "El mecánico revisa el vehículo y registra el diagnóstico correspondiente.",
  },
  {
    number: "04",
    title: "Seguimiento y entrega",
    description:
      "Consulta el estado de la reparación hasta que tu vehículo esté listo.",
  },
];

export default function InicioPage() {
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
              className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
            >
              Inicio
            </Link>

            <Link
              to="/servicios"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
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

          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 sm:py-20 md:py-28 lg:grid-cols-2 lg:items-center lg:px-8">
            <div className="space-y-7">
              <Badge
                variant="secondary"
                className="w-fit border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700"
              >
                Servicio automotriz confiable
              </Badge>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                  Tu vehículo en manos de{" "}
                  <span className="text-blue-600">
                    profesionales
                  </span>
                </h1>

                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Agenda una cita, registra tus vehículos
                  y consulta el avance de cada reparación
                  desde un solo lugar.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 font-semibold text-white shadow-md hover:bg-blue-700"
                >
                  <Link to="/registro">
                    Crear una cuenta

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-slate-300 bg-white font-semibold text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Link to="/servicios">
                    Ver servicios
                  </Link>
                </Button>
              </div>

              <div className="grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  Seguimiento de órdenes
                </div>

                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  Historial por vehículo
                </div>

                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  Citas en línea
                </div>

                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  Diagnósticos registrados
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-blue-100/60 blur-2xl" />

              <Card className="relative overflow-hidden border-slate-200 bg-white shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden bg-blue-600 p-8 text-white sm:p-10">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

                    <div className="absolute -bottom-20 right-12 h-40 w-40 rounded-full bg-blue-500" />

                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 shadow-inner backdrop-blur">
                        <Car className="h-8 w-8" />
                      </div>

                      <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">
                        Control completo de tu reparación
                      </h2>

                      <p className="mt-3 max-w-md text-sm leading-6 text-blue-100">
                        Recibe información sobre el estado
                        actual de tu vehículo durante todo
                        el proceso de mantenimiento.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
                    <div className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                        <CalendarDays className="h-5 w-5" />
                      </div>

                      <p className="mt-4 font-semibold text-slate-900">
                        Citas
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Solicita atención para tu vehículo.
                      </p>
                    </div>

                    <div className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                        <Wrench className="h-5 w-5" />
                      </div>

                      <p className="mt-4 font-semibold text-slate-900">
                        Reparaciones
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Consulta los trabajos realizados.
                      </p>
                    </div>

                    <div className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                        <Clock3 className="h-5 w-5" />
                      </div>

                      <p className="mt-4 font-semibold text-slate-900">
                        Seguimiento
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Revisa el estado de cada orden.
                      </p>
                    </div>

                    <div className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                        <ShieldCheck className="h-5 w-5" />
                      </div>

                      <p className="mt-4 font-semibold text-slate-900">
                        Seguridad
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Acceso protegido para cada cliente.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge
                variant="outline"
                className="border-blue-200 bg-blue-50 text-blue-700"
              >
                Nuestro taller
              </Badge>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Una mejor experiencia para cuidar tu vehículo
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Organizamos cada proceso para ofrecer una
                atención clara, rápida y confiable.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <Card
                    key={benefit.title}
                    className="group border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >
                    <CardHeader className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                        <Icon className="h-6 w-6" />
                      </div>

                      <CardTitle className="pt-4 text-lg font-bold text-slate-900">
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="px-6 pb-6 pt-0">
                      <p className="text-sm leading-6 text-slate-600">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-100/70">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <Badge
                variant="outline"
                className="border-blue-200 bg-white text-blue-700"
              >
                Proceso de atención
              </Badge>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                ¿Cómo funciona?
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Desde la cita inicial hasta la entrega
                del vehículo, podrás consultar cada etapa.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step) => (
                <Card
                  key={step.number}
                  className="group relative overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-blue-50" />

                  <CardContent className="relative p-6">
                    <p className="text-4xl font-bold text-blue-200 transition-colors group-hover:text-blue-300">
                      {step.number}
                    </p>

                    <h3 className="mt-5 font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Card className="overflow-hidden border-slate-200 bg-white shadow-xl">
              <div className="grid lg:grid-cols-[1fr_340px] lg:items-stretch">
                <div className="relative overflow-hidden bg-slate-900 p-8 text-white sm:p-10 lg:p-12">
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30" />

                  <div className="absolute -bottom-24 left-20 h-56 w-56 rounded-full bg-blue-500/20" />

                  <div className="relative">
                    <Badge className="border border-blue-400/30 bg-blue-500/20 text-blue-100 hover:bg-blue-500/20">
                      Agenda tu visita
                    </Badge>

                    <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                      ¿Tu vehículo necesita mantenimiento?
                    </h2>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                      Regístrate como cliente, agrega tu vehículo
                      y solicita una cita con el taller.
                    </p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Button
                        asChild
                        className="bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-500"
                      >
                        <Link to="/registro">
                          Comenzar ahora
                        </Link>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="border-slate-600 bg-transparent font-semibold text-white hover:border-slate-400 hover:bg-white/10 hover:text-white"
                      >
                        <Link to="/servicios">
                          Explorar servicios
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid content-center gap-6 border-t border-slate-200 bg-slate-50 p-8 lg:border-l lg:border-t-0">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                      <Phone className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Teléfono
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        099 999 9999
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Ubicación
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Quito, Ecuador
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                      <Clock3 className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Horario
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Lunes a sábado
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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

          <p className="text-sm text-slate-400">
            © 2026 Taller Mecánico
          </p>
        </div>
      </footer>
    </div>
  );
}