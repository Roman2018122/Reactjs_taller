// src/presentation/components/ui/Toaster.tsx

import {
  AlertCircle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";

import { useToastStore } from "@/presentation/store/toast.store";
import { cn } from "@/presentation/utils/cn";

const variantStyles: Record<string, string> = {
  default:
    "border-blue-200 bg-blue-50 text-blue-800",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-800",
  error:
    "border-red-200 bg-red-50 text-red-800",
};

const variantIcons: Record<string, React.ReactNode> = {
  default: (
    <Info className="h-4 w-4 flex-shrink-0 text-blue-600" />
  ),
  success: (
    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
  ),
  error: (
    <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600" />
  ),
};

export default function Toaster() {
  const toasts = useToastStore(
    (state) => state.toasts,
  );
  const removeToast = useToastStore(
    (state) => state.removeToast,
  );

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      aria-label="Notificaciones"
      className="pointer-events-none fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 sm:bottom-6 sm:right-6"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cn(
            "pointer-events-auto flex w-80 items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-bottom-5 duration-300",
            variantStyles[t.variant],
          )}
        >
          {variantIcons[t.variant]}

          <p className="flex-1 text-sm font-medium">
            {t.message}
          </p>

          <button
            type="button"
            onClick={() => removeToast(t.id)}
            className="flex-shrink-0 rounded p-0.5 opacity-70 transition-opacity hover:opacity-100"
            aria-label="Cerrar notificación"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
