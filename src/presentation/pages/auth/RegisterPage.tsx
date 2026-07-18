// src/presentation/pages/auth/RegisterPage.tsx

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "El usuario debe tener al menos 3 caracteres")
      .max(150, "El usuario es demasiado largo")
      .regex(
        /^[\w.@+-]+$/,
        "Solo se permiten letras, números y los caracteres @ . + - _",
      ),

    email: z
      .string()
      .trim()
      .min(1, "El correo es obligatorio")
      .email("Ingresa un correo válido"),

    first_name: z
      .string()
      .trim()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(150, "El nombre es demasiado largo"),

    last_name: z
      .string()
      .trim()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(150, "El apellido es demasiado largo"),

    identificacion: z
      .string()
      .trim()
      .min(5, "La identificación debe tener al menos 5 caracteres"),

    telefono: z
      .string()
      .trim()
      .min(7, "El teléfono debe tener al menos 7 dígitos")
      .regex(/^\d+$/, "El teléfono solo puede contener números"),

    direccion: z
      .string()
      .trim()
      .min(5, "La dirección debe tener al menos 5 caracteres"),

    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),

    password_confirmacion: z
      .string()
      .min(1, "Debes confirmar la contraseña"),
  })
  .refine(
    (data) =>
      data.password === data.password_confirmacion,
    {
      message: "Las contraseñas no coinciden",
      path: ["password_confirmacion"],
    },
  );

type RegisterFormData = z.infer<typeof registerSchema>;

// ─── Componente ───────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register: registerUser,
    isLoading,
    error,
    clearError,
    user,
  } = useAuthStore();

  /*
   * El endpoint de registro crea únicamente usuarios CLIENTE.
   * Como el adapter inicia sesión automáticamente después del registro,
   * el usuario será enviado al panel de cliente.
   */
  useEffect(() => {
    if (user) {
      navigate("/cliente", {
        replace: true,
      });
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      identificacion: "",
      telefono: "",
      direccion: "",
      password: "",
      password_confirmacion: "",
    },
  });

  async function onSubmit(
    data: RegisterFormData,
  ): Promise<void> {
    clearError();

    try {
      await registerUser({
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        identificacion: data.identificacion,
        telefono: data.telefono,
        direccion: data.direccion,
        password: data.password,
        password_confirmacion:
          data.password_confirmacion,
      });

      /*
       * No navegamos aquí.
       * Cuando el store actualiza user, el useEffect redirige.
       */
    } catch {
      /*
       * El store ya guarda el mensaje de error.
       */
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mb-2 flex justify-center">
            <div className="flex items-center justify-center rounded-full bg-primary p-3 text-primary-foreground">
              <Wrench className="h-6 w-6" />
            </div>
          </div>

          <CardTitle className="text-2xl">
            Crear cuenta de cliente
          </CardTitle>

          <CardDescription>
            Regístrate para gestionar tus vehículos y citas
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {error && (
              <div
                role="alert"
                className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive sm:col-span-2"
              >
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="first_name">
                Nombre
              </Label>

              <Input
                id="first_name"
                type="text"
                autoComplete="given-name"
                placeholder=""
                aria-invalid={Boolean(errors.first_name)}
                disabled={isLoading}
                {...register("first_name")}
              />

              {errors.first_name && (
                <p className="text-xs text-destructive">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="last_name">
                Apellido
              </Label>

              <Input
                id="last_name"
                type="text"
                autoComplete="family-name"
                placeholder=""
                aria-invalid={Boolean(errors.last_name)}
                disabled={isLoading}
                {...register("last_name")}
              />

              {errors.last_name && (
                <p className="text-xs text-destructive">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="username">
                Usuario
              </Label>

              <Input
                id="username"
                type="text"
                autoComplete="username"
                placeholder=""
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
              <Label htmlFor="email">
                Correo electrónico
              </Label>

              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder=""
                aria-invalid={Boolean(errors.email)}
                disabled={isLoading}
                {...register("email")}
              />

              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="identificacion">
                Identificación
              </Label>

              <Input
                id="identificacion"
                type="text"
                inputMode="numeric"
                placeholder=""
                aria-invalid={Boolean(
                  errors.identificacion,
                )}
                disabled={isLoading}
                {...register("identificacion")}
              />

              {errors.identificacion && (
                <p className="text-xs text-destructive">
                  {errors.identificacion.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="telefono">
                Teléfono
              </Label>

              <Input
                id="telefono"
                type="tel"
                autoComplete="tel"
                inputMode="numeric"
                placeholder=""
                aria-invalid={Boolean(errors.telefono)}
                disabled={isLoading}
                {...register("telefono")}
              />

              {errors.telefono && (
                <p className="text-xs text-destructive">
                  {errors.telefono.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="direccion">
                Dirección
              </Label>

              <Input
                id="direccion"
                type="text"
                autoComplete="street-address"
                placeholder="Calle principal y secundaria"
                aria-invalid={Boolean(errors.direccion)}
                disabled={isLoading}
                {...register("direccion")}
              />

              {errors.direccion && (
                <p className="text-xs text-destructive">
                  {errors.direccion.message}
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
                autoComplete="new-password"
                placeholder=""
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

            <div className="space-y-1.5">
              <Label htmlFor="password_confirmacion">
                Confirmar contraseña
              </Label>

              <Input
                id="password_confirmacion"
                type="password"
                autoComplete="new-password"
                placeholder=""
                aria-invalid={Boolean(
                  errors.password_confirmacion,
                )}
                disabled={isLoading}
                {...register("password_confirmacion")}
              />

              {errors.password_confirmacion && (
                <p className="text-xs text-destructive">
                  {
                    errors.password_confirmacion
                      .message
                  }
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="mt-6 flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                "Crear cuenta"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}