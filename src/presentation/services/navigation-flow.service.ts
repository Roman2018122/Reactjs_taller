// src/presentation/services/navigation-flow.service.ts

import {
  serviceRequestStorage,
} from "@/infrastructure/storage/service-request-storage";

type UserRole =
  | "CLIENTE"
  | "EMPLEADO"
  | "ADMIN";

interface PostLoginNavigationParams {
  role: UserRole;
  protectedRoute?: string | null;
}

function getDefaultRouteByRole(
  role: UserRole,
): string {
  if (role === "CLIENTE") {
    return "/cliente";
  }

  if (role === "EMPLEADO") {
    return "/empleado";
  }

  return "/admin";
}

function getPostLoginDestination(
  params: PostLoginNavigationParams,
): string {
  const {
    role,
    protectedRoute,
  } = params;

  /*
   * Primera prioridad:
   * un cliente seleccionó un servicio público
   * antes de iniciar sesión.
   */
  if (
    role === "CLIENTE" &&
    serviceRequestStorage.exists()
  ) {
    return "/cliente/solicitar-servicio";
  }

  /*
   * Segunda prioridad:
   * el usuario intentaba acceder a una ruta
   * protegida antes de iniciar sesión.
   */
  if (protectedRoute) {
    return protectedRoute;
  }

  /*
   * Tercera prioridad:
   * dashboard correspondiente al rol.
   */
  return getDefaultRouteByRole(role);
}

export const navigationFlowService = {
  getDefaultRouteByRole,
  getPostLoginDestination,
};