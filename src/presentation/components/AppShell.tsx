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
  CalendarDays,
  Car,
  ClipboardList,
  LogOut,
  ShieldCheck,
  Stethoscope,
  User,
  Users,
  Wrench,
} from "lucide-react";

import {
  useAuthStore,
} from "@/presentation/store/auth.store";

import {
  Button,
} from "@/presentation/components/ui/button";

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
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-blue-600 text-white shadow-sm"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");
}

function getDashboardPath(
  rol: string | undefined,
): string {
  switch (rol) {
    case "CLIENTE":
      return "/cliente";

    case "EMPLEADO":
      return "/empleado";

    case "ADMIN":
      return "/admin";

    default:
      return "/";
  }
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
  }, [
    isInitialized,
    loadSession,
  ]);

  const clienteNavigation: NavigationItem[] = [
    {
      label: "Panel",
      path: "/cliente",
    },
    {
      label: "Mi perfil",
      path: "/cliente/perfil",
      icon: (
        <User className="h-4 w-4" />
      ),
    },
    {
      label: "Mis vehículos",
      path: "/cliente/vehiculos",
      icon: (
        <Car className="h-4 w-4" />
      ),
    },
    {
      label: "Mis citas",
      path: "/cliente/citas",
      icon: (
        <CalendarDays className="h-4 w-4" />
      ),
    },
    {
      label: "Mis órdenes",
      path: "/cliente/ordenes",
      icon: (
        <ClipboardList className="h-4 w-4" />
      ),
    },
   
    {
      label: "Servicios realizados",
      path: "/cliente/servicios",
      icon: (
        <Wrench className="h-4 w-4" />
      ),
    },
    {
      label: "Recomendaciones",
      path: "/cliente/recomendaciones",
      icon: (
        <ShieldCheck className="h-4 w-4" />
      ),
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
      icon: (
        <Users className="h-4 w-4" />
      ),
    },
    {
      label: "Vehículos",
      path: "/empleado/vehiculos",
      icon: (
        <Car className="h-4 w-4" />
      ),
    },
    {
      label: "Citas",
      path: "/empleado/citas",
      icon: (
        <CalendarDays className="h-4 w-4" />
      ),
    },
    {
      label: "Órdenes de trabajo",
      path: "/empleado/ordenes",
      icon: (
        <ClipboardList className="h-4 w-4" />
      ),
    },
    {
      label: "Diagnósticos",
      path: "/empleado/diagnosticos",
      icon: (
        <Stethoscope className="h-4 w-4" />
      ),
    },
    {
      label: "Servicios de la orden",
      path: "/empleado/servicios",
      icon: (
        <Wrench className="h-4 w-4" />
      ),
    },
    {
      label: "Recomendaciones",
      path: "/empleado/recomendaciones",
      icon: (
        <ShieldCheck className="h-4 w-4" />
      ),
    },
  ];

  /*
   * Por ahora se conserva la misma navegación
   * del empleado para el administrador porque
   * así funcionaba en tu componente original.
   *
   * Cuando tengas las rutas definitivas del
   * administrador, crea adminNavigation.
   */
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

  const dashboardPath =
    getDashboardPath(
      user?.rol,
    );

  async function handleLogout(): Promise<void> {
    await logout();

    navigate(
      "/",
      {
        replace: true,
      },
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Menú lateral privado */}
      {user && (
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
          {/* Marca privada */}
          <div className="border-b border-slate-200 p-5">
            <Link
              to={dashboardPath}
              className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Wrench className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <span className="block truncate text-base font-bold tracking-tight text-slate-900">
                  AutoCenter
                </span>

                <span className="block truncate text-xs text-slate-500">
                  Gestión del taller
                </span>
              </div>
            </Link>
          </div>

          {/* Navegación */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Navegación
            </p>

            <nav className="space-y-1">
              {privateNavigation.map(
                (item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={
                      item.path ===
                      dashboardPath
                    }
                    className={
                      getNavLinkClass
                    }
                  >
                    {item.icon}

                    <span>
                      {item.label}
                    </span>
                  </NavLink>
                ),
              )}
            </nav>
          </div>

          {/* Usuario y sesión */}
          <div className="border-t border-slate-200 p-4">
            <div className="mb-4 rounded-lg bg-slate-50 p-3">
              <p className="truncate text-sm font-semibold text-slate-900">
                {user.nombre_completo ||
                  user.username}
              </p>

              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-blue-600">
                {user.rol}
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start border-slate-300 bg-white text-slate-700 shadow-sm hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" />

              Cerrar sesión
            </Button>
          </div>
        </aside>
      )}

      {/* Contenido principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-500">
          <p>
            AutoCenter ©{" "}
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}