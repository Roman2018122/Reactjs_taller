// src/presentation/components/PublicLayout.tsx

import {
  Menu,
  Wrench,
} from "lucide-react";

import {
  Link,
  Outlet,
} from "react-router-dom";

import {
  Button,
} from "@/presentation/components/ui/button";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Wrench className="h-5 w-5" />
            </div>

            <div>
              <p className="font-bold leading-none tracking-tight text-slate-950">
                Autocenter
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Taller para todas las marcas
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <a
              href="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              Inicio
            </a>

            <a
              href="/servicios"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              Servicios
            </a>

            <a
                href="/#por-que-elegirnos"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
                Nosotros
            </a>

            <a
                href="/#proceso"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
                Cómo funciona
            </a>

            <a
              href="/#contacto"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              Contacto
            </a>
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
                Agendar cita
              </Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="border-slate-300 lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Wrench className="h-4 w-4" />
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
            © {new Date().getFullYear()} Autocenter
          </p>
        </div>
      </footer>
    </div>
  );
}