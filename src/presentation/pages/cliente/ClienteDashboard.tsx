
// src/presentation/pages/cliente/ClienteDashboard.tsx

import { Link } from "react-router-dom";

import {
  Car,
  CalendarDays,
  ClipboardList,
  Stethoscope,
  Wrench,
  ShieldCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuthStore } from "@/presentation/store/auth.store";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

function DashboardCard({
  title,
  description,
  icon,
  to,
}: DashboardCardProps) {
  return (
    <Link
      to={to}
      className="group block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <Card className="h-full overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-blue-300 group-hover:shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4 border-b border-slate-200 bg-slate-50 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
            {icon}
          </div>

          <CardTitle className="text-lg font-semibold text-slate-900">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          <p className="text-sm leading-6 text-slate-600">
            {description}
          </p>

          <p className="mt-4 text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
            Ir al módulo
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ClienteDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-100/70" />

        <div className="absolute -bottom-16 right-24 h-32 w-32 rounded-full bg-slate-100" />

        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Panel de cliente
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Bienvenido
            {user ? `, ${user.first_name}` : ""}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Gestiona tus vehículos, citas y órdenes de
            trabajo desde un solo lugar.
          </p>
        </div>
      </header>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Accesos principales
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Selecciona una opción para consultar o
            administrar la información de tu vehículo.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="Mis Vehículos"
            description="Consulta y administra tus vehículos registrados."
            to="/cliente/vehiculos"
            icon={<Car className="h-6 w-6" />}
          />

          <DashboardCard
            title="Mis Citas"
            description="Revisa y agenda tus citas."
            to="/cliente/citas"
            icon={<CalendarDays className="h-6 w-6" />}
          />

          <DashboardCard
            title="Mis Órdenes"
            description="Consulta el estado de tus órdenes de trabajo."
            to="/cliente/ordenes"
            icon={<ClipboardList className="h-6 w-6" />}
          />


          <DashboardCard
            title="Servicios Realizados"
            description="Consulta los servicios efectuados en tus vehículos."
            to="/cliente/servicios"
            icon={<Wrench className="h-6 w-6" />}
          />

          <DashboardCard
            title="Recomendaciones"
            description="Revisa los mantenimientos recomendados."
            to="/cliente/recomendaciones"
            icon={<ShieldCheck className="h-6 w-6" />}
          />
        </div>
      </section>
    </main>
  );
}

