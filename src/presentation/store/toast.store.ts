// src/presentation/store/toast.store.ts

import { create } from "zustand";

export type ToastVariant = "default" | "success" | "error";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastState {
  toasts: Toast[];
  addToast: (
    message: string,
    variant?: ToastVariant,
  ) => void;
  removeToast: (id: string) => void;
}

let counter = 0;

export const useToastStore =
  create<ToastState>((set) => ({
    toasts: [],

    addToast: (message, variant = "default") => {
      const id = `toast-${++counter}-${Date.now()}`;

      set((state) => ({
        toasts: [...state.toasts, { id, message, variant }],
      }));

      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter(
            (t) => t.id !== id,
          ),
        }));
      }, 4000);
    },

    removeToast: (id) => {
      set((state) => ({
        toasts: state.toasts.filter(
          (t) => t.id !== id,
        ),
      }));
    },
  }));

/**
 * Atajos de uso rápido.
 */
export const toast = {
  success: (message: string) =>
    useToastStore.getState().addToast(message, "success"),
  error: (message: string) =>
    useToastStore.getState().addToast(message, "error"),
  info: (message: string) =>
    useToastStore.getState().addToast(message, "default"),
};
