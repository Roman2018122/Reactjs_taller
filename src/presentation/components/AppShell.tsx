// src/presentation/components/AppShell.tsx

import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  Car,
  CalendarDays,
  ClipboardList,
  LogIn,
  LogOut,
  Stethoscope,
  User,
  Users,
  Wrench,
} from "lucide-react";

import { useAuthStore } from "@/presentation/store/auth.store";
import { Button } from "@/presentation/components/ui/button";

interface NavigationItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

function getNavLinkClass({
  isActive,
}: {
  isActive: boolean;
}): string {
  return [
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  ].join(" ");
}

export default function AppShell() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const publicNavigation: NavigationItem[] = [
    {
      label: "Inicio",
      path: "/",
    },
    {
      label: "Nosotros",
      path: "/nosotros",
    },
    {
      label: "Servicios",
      path: "/servicios",
    },
    {
      label: "Contacto",
      path: "/contacto",
    },
  ];

  const clienteNavigation: NavigationItem[] = [
    {
      label: "Panel",
      path: "/cliente",
    },
    {
      label: "Mi perfil",
      path: "/cliente/perfil",
      icon: <User className="h-4 w-4" />,
    },
    {
      label: "Mis vehículos",
      path: "/cliente/vehiculos",
      icon: <Car className="h-4 w-4" />,
    },
    {
      label: "Mis citas",
      path: "/cliente/citas",
      icon: <CalendarDays className="h-4 w-4" />,
    },
    {
      label: "Mis órdenes",
      path: "/cliente/ordenes",
      icon: <ClipboardList className="h-4 w-4" />,
    },
    {
      label: "Diagnósticos",
      path: "/cliente/diagnosticos",
      icon: <Stethoscope className="h-4 w-4" />,
    },
    {
      label: "Servicios realizados",
      path: "/cliente/servicios",
      icon: <Wrench className="h-4 w-4" />,
    },
    {
      label: "Recomendaciones",
      path: "/cliente/recomendaciones",
    },
  ];

  const empleadoNavigation: NavigationItem[] = [
    {
      label: "Panel",
      path: "/empleado",
    },
    {
      label: "Clientes",
      path: "/empleado/clientes",
      icon: <Users className="h-4 w-4" />,
    },
    {
      label: "Vehículos",
      path: "/empleado/vehiculos",
      icon: <Car className="h-4 w-4" />,
    },
    {
      label: "Citas",
      path: "/empleado/citas",
      icon: <CalendarDays className="h-4 w-4" />,
    },
    {
      label: "Órdenes",
      path: "/empleado/ordenes",
      icon: <ClipboardList className="h-4 w-4" />,
    },
    {
      label: "Diagnósticos",
      path: "/empleado/diagnosticos",
      icon: <Stethoscope className="h-4 w-4" />,
    },
    {
      label: "Servicios de la orden",
      path: "/empleado/servicios",
      icon: <Wrench className="h-4 w-4" />,
    },
    {
      label: "Recomendaciones",
      path: "/empleado/recomendaciones",
    },
  ];

  let privateNavigation: NavigationItem[] = [];

  if (user?.rol === "CLIENTE") {
    privateNavigation = clienteNavigation;
  }

  if (
    user?.rol === "EMPLEADO" ||
    user?.rol === "ADMIN"
  ) {
    privateNavigation = empleadoNavigation;
  }

  async function handleLogout(): Promise<void> {
    await logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center gap-4 px-4 py-3">
          {/* Marca */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-primary"
          >
            <Wrench className="h-6 w-6" />

            <span>Taller Mecánico</span>
          </Link>

          {/* Navegación pública */}
          <nav className="flex flex-wrap items-center gap-1">
            {publicNavigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={getNavLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Usuario */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium">
                  {user.nombre_completo ||
                    user.username}
                </p>

                <p className="text-xs text-muted-foreground">
                  {user.rol}
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <Button asChild size="sm">
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar sesión
              </Link>
            </Button>
          )}
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1">
        {/* Navegación privada */}
        {user && (
          <aside className="hidden w-64 border-r bg-background p-4 md:block">
            <p className="mb-3 px-3 text-xs font-semibold uppercase text-muted-foreground">
              Navegación
            </p>

            <nav className="space-y-1">
              {privateNavigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={
                    item.path === "/cliente" ||
                    item.path === "/empleado"
                  }
                  className={getNavLinkClass}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>
        )}

        {/* Contenido de la ruta */}
        <main className="min-w-0 flex-1 px-4 py-6">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t bg-background py-4 text-center text-sm text-muted-foreground">
        Taller Mecánico © {new Date().getFullYear()}
      </footer>
    </div>
  );
}