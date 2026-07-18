// src/infrastructure/config/api.config.ts

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL ?? 'http://165.227.99.251/api',
  TIMEOUT: 10_000,
} as const