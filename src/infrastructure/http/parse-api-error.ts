// src/infrastructure/http/parse-api-error.ts

import type { AxiosError } from "axios";

import { ApiException } from "@/domain/exceptions/api.exception";

/** Forma esperada de las respuestas de error de Django REST Framework. */
interface DjangoErrorResponse {
  detail?: string;
  non_field_errors?: string[];
  [field: string]: string[] | string | undefined;
}

/**
 * Convierte cualquier error en un ApiException.
 */
export function parseApiError(error: unknown): ApiException {
  const axiosError = error as AxiosError<DjangoErrorResponse>;

  // No hubo respuesta del servidor
  if (!axiosError.response) {
    return new ApiException(
      0,
      "No se pudo conectar con el servidor. Verifica tu conexión."
    );
  }

  const { status, data } = axiosError.response;

  let detail = `Error ${status}`;

  if (data?.detail) {
    detail = String(data.detail);
  } else if (data?.non_field_errors?.length) {
    detail = data.non_field_errors[0];
  }

  let fieldErrors: Record<string, string[]> | undefined;

  if (status === 400 && data) {
    fieldErrors = {};

    for (const [key, value] of Object.entries(data)) {
      if (key === "detail" || key === "non_field_errors") {
        continue;
      }

      if (Array.isArray(value)) {
        fieldErrors[key] = value.map(String);
      }
    }

    if (Object.keys(fieldErrors).length === 0) {
      fieldErrors = undefined;
    }
  }

  return new ApiException(status, detail, fieldErrors);
}