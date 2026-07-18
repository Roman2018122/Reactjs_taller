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
import { Loader2, Wrench } from "lucide-react";

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
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-8">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-2 flex justify-center">
            <div className="flex items-center justify-center rounded-full bg-primary p-3 text-primary-foreground">
              <Wrench className="h-6 w-6" />
            </div>
          </div>

          <CardTitle className="text-2xl">
            Taller Mecánico
          </CardTitle>

          <CardDescription>
            Inicia sesión para acceder al sistema
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <CardContent className="space-y-4">
            {error && (
              <div
                role="alert"
                className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="username">
                Usuario
              </Label>

              <Input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Ingresa tu usuario"
                aria-invalid={Boolean(errors.username)}
                disabled={isLoading}
                {...register("username")}
              />

              {errors.username && (
                <p className="text-xs text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">
                Contraseña
              </Label>

              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña"
                aria-invalid={Boolean(errors.password)}
                disabled={isLoading}
                {...register("password")}
              />

              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
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

            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/registro"
                className="font-medium text-primary hover:underline"
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