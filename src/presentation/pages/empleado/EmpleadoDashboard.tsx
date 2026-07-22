
// src/presentation/pages/empleado/EmpleadoDashboard.tsx

import { Link } from "react-router-dom";

import {
  Users,
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
} from "@/presentation/components/ui/card";

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

export default function EmpleadoDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-100/70" />

        <div className="absolute -bottom-16 right-24 h-32 w-32 rounded-full bg-slate-100" />

        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Panel de empleado
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Bienvenido
            {user ? `, ${user.first_name}` : ""}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Gestiona la operación diaria del taller desde
            este panel.
          </p>
        </div>
      </header>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Gestión del taller
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Selecciona una opción para administrar los
            procesos y servicios del taller.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="Clientes"
            description="Consulta y administra la información de los clientes."
            to="/empleado/clientes"
            icon={<Users className="h-6 w-6" />}
          />

          <DashboardCard
            title="Vehículos"
            description="Consulta los vehículos registrados."
            to="/empleado/vehiculos"
            icon={<Car className="h-6 w-6" />}
          />

          <DashboardCard
            title="Citas"
            description="Gestiona las citas programadas."
            to="/empleado/citas"
            icon={<CalendarDays className="h-6 w-6" />}
          />

          <DashboardCard
            title="Órdenes de Trabajo"
            description="Administra las órdenes de trabajo del taller."
            to="/empleado/ordenes"
            icon={<ClipboardList className="h-6 w-6" />}
          />

          <DashboardCard
            title="Diagnósticos"
            description="Registra y consulta diagnósticos de vehículos."
            to="/empleado/diagnosticos"
            icon={<Stethoscope className="h-6 w-6" />}
          />

          
          
        </div>
      </section>
    </main>
  );
}

