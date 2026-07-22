
// src/presentation/pages/auth/LoginPage.tsx

import { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  LockKeyhole,
  User,
  Wrench,
} from "lucide-react";

import { useAuthStore } from "@/presentation/store/auth.store";

import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";

// ─── Validación ───────────────────────────────────────────────────────────────

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "El usuario debe tener al menos 3 caracteres"),

  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ─── Tipos de navegación ──────────────────────────────────────────────────────

interface LoginLocationState {
  from?: {
    pathname?: string;
  };
}

// ─── Utilidades ───────────────────────────────────────────────────────────────

function getDefaultRouteByRole(
  role: "CLIENTE" | "EMPLEADO" | "ADMIN",
): string {
  if (role === "CLIENTE") {
    return "/cliente";
  }

  return "/empleado";
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    login,
    isLoading,
    error,
    clearError,
    user,
  } = useAuthStore();

  const locationState =
    location.state as LoginLocationState | null;

  const protectedRoute =
    locationState?.from?.pathname ?? null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  /*
   * Si el usuario ya inició sesión e intenta entrar nuevamente
   * a /login, se lo envía a su ruta correspondiente.
   */
  useEffect(() => {
    if (!user) {
      return;
    }

    const destination =
      protectedRoute ?? getDefaultRouteByRole(user.rol);

    navigate(destination, {
      replace: true,
    });
  }, [user, protectedRoute, navigate]);

  async function onSubmit(
    data: LoginFormData,
  ): Promise<void> {
    clearError();

    try {
      await login({
        username: data.username,
        password: data.password,
      });

      /*
       * No navegamos manualmente aquí.
       * Cuando el store actualiza user, el useEffect realiza
       * la redirección según la ruta anterior o el rol.
       */
    } catch {
      /*
       * El store ya convierte y guarda el error.
       */
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-8 sm:px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-slate-400/10 blur-3xl" />

      <Card className="relative w-full max-w-md overflow-hidden border-slate-200 bg-white shadow-2xl">
        <CardHeader className="border-b border-slate-200 bg-slate-50 px-6 py-7 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Wrench className="h-7 w-7" />
            </div>
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            AutoCenter
          </CardTitle>

          <CardDescription className="mt-2 text-sm leading-6 text-slate-600">
            Inicia sesión para gestionar tus citas,
            vehículos y servicios.
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <CardContent className="space-y-5 px-6 py-6">
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-semibold text-slate-700"
              >
                Usuario
              </Label>

              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Ingresa tu usuario"
                  aria-invalid={Boolean(errors.username)}
                  disabled={isLoading}
                  className="h-11 border-slate-300 bg-white pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  {...register("username")}
                />
              </div>

              {errors.username && (
                <p className="text-xs font-medium text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                Contraseña
              </Label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  aria-invalid={Boolean(errors.password)}
                  disabled={isLoading}
                  className="h-11 border-slate-300 bg-white pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  {...register("password")}
                />
              </div>

              {errors.password && (
                <p className="text-xs font-medium text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-6 py-6">
            <Button
              type="submit"
              className="h-11 w-full bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>

            <p className="text-center text-sm text-slate-600">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/registro"
                className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
              >
                Regístrate
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}

