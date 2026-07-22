import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  Coffee,
  
  Globe2,
  Share2,
  Gauge,
  
  Laptop,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Snowflake,
  Users,
  Wifi,
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
    title: "Garantía en nuestros trabajos",
    description:
      "Respaldamos los servicios realizados y te explicamos claramente el trabajo efectuado.",
    icon: ShieldCheck,
  },
  {
    title: "Técnicos capacitados",
    description:
      "Nuestro equipo cuenta con experiencia para atender vehículos de diferentes marcas y modelos.",
    icon: BadgeCheck,
  },
  {
    title: "Diagnóstico transparente",
    description:
      "Conoce el diagnóstico, los servicios necesarios y los valores antes de autorizar una reparación.",
    icon: Gauge,
  },
  {
    title: "Atención multimarca",
    description:
      "Trabajamos con vehículos de distintas marcas utilizando procesos organizados y confiables.",
    icon: Car,
  },
];

const amenities = [
  {
    title: "Sala climatizada",
    description:
      "Espera cómodamente mientras atendemos tu vehículo.",
    icon: Snowflake,
  },
  {
    title: "Wi-Fi gratuito",
    description:
      "Mantente conectado durante tu visita al taller.",
    icon: Wifi,
  },
  {
    title: "Café y bebidas",
    description:
      "Disfruta de una bebida mientras realizamos la revisión.",
    icon: Coffee,
  },
  {
    title: "Área de trabajo",
    description:
      "Espacio disponible para continuar con tus actividades.",
    icon: Laptop,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Agenda tu cita",
    description:
      "Regístrate y solicita una cita desde la web o comunícate directamente con nuestro taller.",
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Trae tu vehículo",
    description:
      "Recibimos el vehículo, verificamos la información y creamos una orden de trabajo.",
    icon: Car,
  },
  {
    number: "03",
    title: "Diagnóstico y autorización",
    description:
      "Revisamos el vehículo y te informamos los trabajos necesarios antes de continuar.",
    icon: CheckCircle2,
  },
  {
    number: "04",
    title: "Reparación y entrega",
    description:
      "Realizamos los trabajos autorizados y te notificamos cuando el vehículo esté listo.",
    icon: Wrench,
  },
];

export default function InicioPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Encabezado */}
      

      <main>
        {/* Hero */}
        <section
          id="inicio"
          className="relative overflow-hidden border-b border-slate-200 bg-white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-100" />

          <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-blue-200/50 blur-3xl" />

          <div className="absolute -bottom-48 -left-32 h-[440px] w-[440px] rounded-full bg-slate-300/50 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
            <div className="space-y-8">
              <Badge
                variant="secondary"
                className="w-fit border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700"
              >
                Servicio automotriz multimarca
              </Badge>

              <div className="space-y-5">
                <h1 className="text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                  Autocenter
                </h1>

                <p className="text-2xl font-bold tracking-tight text-blue-600 sm:text-3xl">
                  El taller de todas las marcas
                </p>

                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Diagnóstico, mantenimiento y reparación
                  profesional con información clara y seguimiento
                  en línea durante todo el proceso.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                >
                  <Link to="/registro">
                    Agendar una cita

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-slate-300 bg-white font-semibold text-slate-700 shadow-sm hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                >
                  <a
                    href="https://wa.me/593999999999"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contactar por WhatsApp
                  </a>
                </Button>
              </div>

              <div className="grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  Técnicos capacitados
                </div>

                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  Atención multimarca
                </div>

                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  Presupuestos transparentes
                </div>

                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  Seguimiento por la web
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[2rem] bg-blue-200/50 blur-2xl" />

              <Card className="relative overflow-hidden border-slate-200 bg-white shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden bg-slate-950 p-8 text-white sm:p-10">
                    <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-blue-600/40" />

                    <div className="absolute -bottom-24 left-16 h-48 w-48 rounded-full bg-blue-500/20" />

                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                        <Car className="h-8 w-8" />
                      </div>

                      <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">
                        Tu vehículo siempre bajo control
                      </h2>

                      <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                        Inicia sesión para consultar el diagnóstico,
                        autorizar trabajos y conocer el estado actual
                        de la reparación.
                      </p>

                      <Button
                        asChild
                        className="mt-6 bg-white font-semibold text-slate-900 hover:bg-blue-50"
                      >
                        <Link to="/login">
                          Consultar mi vehículo

                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <CalendarDays className="h-5 w-5 text-blue-600" />

                      <p className="mt-3 font-semibold text-slate-900">
                        Citas en línea
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Solicita atención desde cualquier lugar.
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <Wrench className="h-5 w-5 text-blue-600" />

                      <p className="mt-3 font-semibold text-slate-900">
                        Diagnósticos
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Consulta los trabajos recomendados.
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <Clock3 className="h-5 w-5 text-blue-600" />

                      <p className="mt-3 font-semibold text-slate-900">
                        Seguimiento
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Revisa el avance de la reparación.
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <Award className="h-5 w-5 text-blue-600" />

                      <p className="mt-3 font-semibold text-slate-900">
                        Garantía
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Trabajos respaldados por nuestro taller.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section
          id="por-que-elegirnos"
          className="bg-white"
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="border-blue-200 bg-blue-50 text-blue-700"
              >
                Confianza y experiencia
              </Badge>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                ¿Por qué elegir Autocenter?
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Cuidamos tu vehículo mediante procesos organizados,
                comunicación transparente y atención profesional.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <Card
                    key={benefit.title}
                    className="group border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    <CardHeader className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
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

        {/* Amenidades */}
        <section className="border-y border-slate-200 bg-slate-100/70">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <Badge
                  variant="outline"
                  className="border-blue-200 bg-white text-blue-700"
                >
                  Tu comodidad importa
                </Badge>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Amenidades pensadas para nuestros clientes
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  Mientras nuestro equipo atiende tu vehículo,
                  dispondrás de espacios cómodos para descansar,
                  conectarte o continuar trabajando.
                </p>

                <div className="mt-7 rounded-xl border border-blue-200 bg-blue-50 p-5">
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                    <p className="text-sm leading-6 text-blue-900">
                      Nuestro personal estará disponible para informarte
                      sobre el avance del servicio durante tu visita.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {amenities.map((amenity) => {
                  const Icon = amenity.icon;

                  return (
                    <Card
                      key={amenity.title}
                      className="group border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                    >
                      <CardContent className="p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                          <Icon className="h-6 w-6" />
                        </div>

                        <h3 className="mt-5 font-bold text-slate-900">
                          {amenity.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {amenity.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section
          id="proceso"
          className="bg-white"
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="border-blue-200 bg-blue-50 text-blue-700"
              >
                Proceso simple y transparente
              </Badge>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                ¿Cómo agendar y recibir atención?
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Desde la solicitud de la cita hasta la entrega del
                vehículo, podrás conocer cada etapa del proceso.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <Card
                    key={step.number}
                    className="group relative overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-blue-50" />

                    <CardContent className="relative p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                          <Icon className="h-6 w-6" />
                        </div>

                        <p className="text-4xl font-black text-blue-100">
                          {step.number}
                        </p>
                      </div>

                      <h3 className="mt-6 font-bold text-slate-900">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-10 overflow-hidden border-blue-200 bg-blue-50 shadow-sm">
              <CardContent className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Clock3 className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-950">
                      Sigue la reparación desde la web
                    </h3>

                    <p className="mt-1 max-w-3xl text-sm leading-6 text-blue-900/80">
                      En caso de demora, inicia sesión para consultar
                      el estado de la orden, los diagnósticos, los
                      servicios realizados y la fecha estimada de entrega.
                    </p>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full shrink-0 bg-blue-600 font-semibold text-white hover:bg-blue-700 sm:w-auto"
                >
                  <Link to="/login">
                    Iniciar sesión

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Encuéntranos */}
        <section
          id="contacto"
          className="border-t border-slate-200 bg-slate-100/70"
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="border-blue-200 bg-white text-blue-700"
              >
                Visítanos
              </Badge>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Encuéntranos
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Contáctanos o acércate a nuestro taller para recibir
                atención personalizada.
              </p>
            </div>

            <div className="mt-12 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl lg:grid-cols-[1.1fr_0.9fr]">
              {/* Espacio para mapa */}
              <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-slate-200">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-blue-100" />

                <div className="relative max-w-sm px-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                    <MapPin className="h-8 w-8" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    Ubicación del taller
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Espacio reservado para integrar Google Maps
                    o el mapa de ubicación de Autocenter.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-slate-950">
                  Autocenter
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Taller para todas las marcas
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Dirección
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Quito, Ecuador
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Phone className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Teléfono
                      </p>

                      <a
                        href="tel:+593999999999"
                        className="mt-1 block text-sm text-slate-600 transition-colors hover:text-blue-600"
                      >
                        099 999 9999
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Clock3 className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Horario de atención
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Lunes a viernes: 08:00 – 18:00
                      </p>

                      <p className="text-sm leading-6 text-slate-600">
                        Sábados: 08:00 – 14:00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <Button
                    asChild
                    className="bg-green-600 font-semibold text-white hover:bg-green-700"
                  >
                    <a
                      href="https://wa.me/593999999999"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="border-slate-300 bg-white font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <a href="tel:+593999999999">
                      <Phone className="mr-2 h-4 w-4" />
                      Llamar ahora
                    </a>
                  </Button>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-6">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Share2 className="h-5 w-5" />
                  </a>

                  <a
                    href="#"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Globe2 className="h-5 w-5" />
                  </a>

                  <p className="text-sm text-slate-500">
                    Síguenos en redes sociales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Card className="overflow-hidden border-slate-800 bg-slate-950 shadow-2xl">
              <CardContent className="relative flex flex-col gap-8 overflow-hidden p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30" />

                <div className="absolute -bottom-28 left-24 h-56 w-56 rounded-full bg-blue-500/20" />

                <div className="relative max-w-2xl">
                  <Badge className="border border-blue-400/30 bg-blue-500/20 text-blue-100 hover:bg-blue-500/20">
                    Agenda tu visita
                  </Badge>

                  <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    Dale a tu vehículo la atención que necesita
                  </h2>

                  <p className="mt-4 leading-7 text-slate-300">
                    Crea tu cuenta, registra tu vehículo y solicita
                    una cita con Autocenter.
                  </p>
                </div>

                <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 font-semibold text-white hover:bg-blue-500"
                  >
                    <Link to="/registro">
                      Agendar cita

                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-slate-600 bg-transparent font-semibold text-white hover:border-slate-400 hover:bg-white/10 hover:text-white"
                  >
                    <Link to="/servicios">
                      Ver servicios
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 md:items-center lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Wrench className="h-5 w-5" />
            </div>

            <div>
              <p className="font-semibold text-white">
                Autocenter
              </p>

              <p className="text-xs text-slate-400">
                Taller para todas las marcas
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-sm md:justify-center">
            <a
              href="#inicio"
              className="transition-colors hover:text-white"
            >
              Inicio
            </a>

            <a
              href="#por-que-elegirnos"
              className="transition-colors hover:text-white"
            >
              Nosotros
            </a>

            <Link
              to="/servicios"
              className="transition-colors hover:text-white"
            >
              Servicios
            </Link>

            <a
              href="#contacto"
              className="transition-colors hover:text-white"
            >
              Contacto
            </a>
          </div>

          <p className="text-sm text-slate-400 md:text-right">
            © {new Date().getFullYear()} Autocenter
          </p>
        </div>
      </footer>
    </div>
  );
}