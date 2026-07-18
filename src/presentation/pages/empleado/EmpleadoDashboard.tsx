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
    <Link to={to}>
      <Card className="h-full transition hover:border-primary hover:shadow-lg">
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

export default function EmpleadoDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Bienvenido
          {user ? `, ${user.first_name}` : ""}
        </h1>

        <p className="mt-2 text-muted-foreground">
          Gestiona la operación diaria del taller desde este panel.
        </p>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Clientes"
          description="Consulta y administra la información de los clientes."
          to="/empleado/clientes"
          icon={<Users className="h-8 w-8 text-primary" />}
        />

        <DashboardCard
          title="Vehículos"
          description="Consulta los vehículos registrados."
          to="/empleado/vehiculos"
          icon={<Car className="h-8 w-8 text-primary" />}
        />

        <DashboardCard
          title="Citas"
          description="Gestiona las citas programadas."
          to="/empleado/citas"
          icon={<CalendarDays className="h-8 w-8 text-primary" />}
        />

        <DashboardCard
          title="Órdenes de Trabajo"
          description="Administra las órdenes de trabajo del taller."
          to="/empleado/ordenes"
          icon={<ClipboardList className="h-8 w-8 text-primary" />}
        />

        <DashboardCard
          title="Diagnósticos"
          description="Registra y consulta diagnósticos de vehículos."
          to="/empleado/diagnosticos"
          icon={<Stethoscope className="h-8 w-8 text-primary" />}
        />

        <DashboardCard
          title="Servicios de la Orden"
          description="Gestiona los servicios realizados en cada orden."
          to="/empleado/servicios"
          icon={<Wrench className="h-8 w-8 text-primary" />}
        />

        <DashboardCard
          title="Recomendaciones"
          description="Registra recomendaciones de mantenimiento para los clientes."
          to="/empleado/recomendaciones"
          icon={<ShieldCheck className="h-8 w-8 text-primary" />}
        />
      </section>
    </div>
  );
}