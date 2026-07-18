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
    <Link to={to}>
      <Card className="h-full transition hover:shadow-lg hover:border-primary">
        <CardHeader className="flex flex-row items-center gap-4">
          {icon}

          <CardTitle className="text-lg">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ClienteDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Bienvenido
          {user ? `, ${user.first_name}` : ""}
        </h1>

        <p className="text-muted-foreground mt-2">
          Gestiona tus vehículos, citas y órdenes de trabajo desde un solo lugar.
        </p>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Mis Vehículos"
          description="Consulta y administra tus vehículos registrados."
          to="/cliente/vehiculos"
          icon={<Car className="h-8 w-8 text-primary" />}
        />

        <DashboardCard
          title="Mis Citas"
          description="Revisa y agenda tus citas."
          to="/cliente/citas"
          icon={<CalendarDays className="h-8 w-8 text-primary" />}
        />

        <DashboardCard
          title="Mis Órdenes"
          description="Consulta el estado de tus órdenes de trabajo."
          to="/cliente/ordenes"
          icon={<ClipboardList className="h-8 w-8 text-primary" />}
        />

        <DashboardCard
          title="Diagnósticos"
          description="Visualiza los diagnósticos realizados."
          to="/cliente/diagnosticos"
          icon={<Stethoscope className="h-8 w-8 text-primary" />}
        />

        <DashboardCard
          title="Servicios Realizados"
          description="Consulta los servicios efectuados en tus vehículos."
          to="/cliente/servicios"
          icon={<Wrench className="h-8 w-8 text-primary" />}
        />

        <DashboardCard
          title="Recomendaciones"
          description="Revisa los mantenimientos recomendados."
          to="/cliente/recomendaciones"
          icon={<ShieldCheck className="h-8 w-8 text-primary" />}
        />
      </section>
    </div>
  );
}