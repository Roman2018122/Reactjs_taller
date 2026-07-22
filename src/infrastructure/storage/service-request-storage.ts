// src/infrastructure/storage/service-request-storage.ts

export interface PendingServiceRequest {
  servicioId: number;
  servicioNombre: string;
}

const STORAGE_KEY =
  "autocenter_pending_service_request";

export const serviceRequestStorage = {
  save(
    request: PendingServiceRequest,
  ): void {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(request),
    );
  },

  get(): PendingServiceRequest | null {
    const value =
      localStorage.getItem(STORAGE_KEY);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(
        value,
      ) as PendingServiceRequest;
    } catch {
      localStorage.removeItem(
        STORAGE_KEY,
      );

      return null;
    }
  },

  clear(): void {
    localStorage.removeItem(
      STORAGE_KEY,
    );
  },

  exists(): boolean {
    return (
      localStorage.getItem(
        STORAGE_KEY,
      ) !== null
    );
  },
};