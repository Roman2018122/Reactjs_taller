import type { ReactNode } from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import { useAuthStore } from "@/presentation/store/auth.store";

import type { UserRole } from "@/domain/entities/logged-user.entity";

interface ProtectedRouteProps {
  children: ReactNode;

  /**
   * Roles permitidos para acceder a la ruta.
   * Si se omite, basta con estar autenticado.
   */
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const location = useLocation();

  const user = useAuthStore(
    (state) => state.user,
  );

  const isInitialized = useAuthStore(
    (state) => state.isInitialized,
  );

  // Espera hasta que se haya intentado restaurar la sesión.
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // La restauración terminó y no existe usuario autenticado.
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // Tiene sesión, pero no posee el rol requerido.
  if (
    allowedRoles &&
    !allowedRoles.includes(user.rol)
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <>{children}</>;
}