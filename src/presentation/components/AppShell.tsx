
// src/presentation/components/AppShell.tsx

import {
  useEffect,
  type ReactNode,
} from "react";

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
  icon?: ReactNode;
}

function getNavLinkClass({
  isActive,
}: {
  isActive: boolean;
}): string {
  return [
    "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-blue-600 text-white shadow-sm"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");
}

export default function AppShell() {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user,
  );

  const logout = useAuthStore(
    (state) => state.logout,
  );

  const loadSession = useAuthStore(
    (state) => state.loadSession,
  );

  const isInitialized = useAuthStore(
    (state) => state.isInitialized,
  );

  useEffect(() => {
    if (!isInitialized) {
      void loadSession();
    }
  }, [isInitialized, loadSession]);

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
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Marca */}
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Wrench className="h-5 w-5" />
            </div>

            <div>
              <span className="block text-base font-bold tracking-tight text-slate-900">
                Taller Mecánico
              </span>

              <span className="hidden text-xs text-slate-500 sm:block">
                Gestión de vehículos y servicios
              </span>
            </div>
          </Link>

          {/* Navegación pública */}
          <nav className="order-3 flex w-full flex-wrap items-center gap-1 border-t border-slate-200 pt-3 md:order-none md:w-auto md:border-0 md:pt-0">
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
              <div className="hidden border-r border-slate-200 pr-3 text-right sm:block">
                <p className="max-w-44 truncate text-sm font-semibold text-slate-900">
                  {user.nombre_completo ||
                    user.username}
                </p>

                <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                  {user.rol}
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-slate-300 bg-white text-slate-700 shadow-sm hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <Button
              asChild
              size="sm"
              className="bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-700"
            >
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
          <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-4 py-6 md:block">
            <div className="sticky top-24">
              <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
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
            </div>
          </aside>
        )}

        {/* Contenido de la ruta */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-500">
        <p>
          Taller Mecánico © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

