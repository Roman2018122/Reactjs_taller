// src/infrastructure/factories/auth.factory.ts

import { AuthUseCase } from "@/application/use-cases/auth.use-case";
import { AxiosAuthRepository } from "@/infrastructure/adapters/axios-auth.repository";

/**
 * Instancia única del caso de uso de autenticación.
 *
 * Aquí se conecta el contrato AuthRepository con su implementación
 * concreta basada en Axios.
 */
export const authUseCase = new AuthUseCase(
  new AxiosAuthRepository(),
);