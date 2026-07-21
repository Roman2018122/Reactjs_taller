
// src/presentation/pages/auth/RegisterPage.tsx

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AtSign,
  BadgeCheck,
  Home,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-8 sm:px-6 lg:py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-slate-300/10 blur-3xl" />

      <Card className="relative w-full max-w-3xl overflow-hidden border-slate-200 bg-white shadow-2xl">
        <CardHeader className="border-b border-slate-200 bg-slate-50 px-6 py-7 text-center sm:px-8">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Wrench className="h-7 w-7" />
            </div>
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Crear cuenta de cliente
          </CardTitle>

          <CardDescription className="mt-2 text-sm leading-6 text-slate-600">
            Regístrate para gestionar tus vehículos,
            solicitar citas y consultar los servicios del
            taller.
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <CardContent className="grid gap-5 px-6 py-6 sm:grid-cols-2 sm:px-8">
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 sm:col-span-2"
              >
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="first_name"
                className="text-sm font-semibold text-slate-700"
              >
                Nombre
              </Label>

              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="first_name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Ingresa tu nombre"
                  aria-invalid={Boolean(errors.first_name)}
                  disabled={isLoading}
                  className="h-11 border-slate-300 bg-white pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  {...register("first_name")}
                />
              </div>

              {errors.first_name && (
                <p className="text-xs font-medium text-red-600">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="last_name"
                className="text-sm font-semibold text-slate-700"
              >
                Apellido
              </Label>

              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="last_name"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Ingresa tu apellido"
                  aria-invalid={Boolean(errors.last_name)}
                  disabled={isLoading}
                  className="h-11 border-slate-300 bg-white pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  {...register("last_name")}
                />
              </div>

              {errors.last_name && (
                <p className="text-xs font-medium text-red-600">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-semibold text-slate-700"
              >
                Usuario
              </Label>

              <div className="relative">
                <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Crea un nombre de usuario"
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
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                Correo electrónico
              </Label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="ejemplo@correo.com"
                  aria-invalid={Boolean(errors.email)}
                  disabled={isLoading}
                  className="h-11 border-slate-300 bg-white pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  {...register("email")}
                />
              </div>

              {errors.email && (
                <p className="text-xs font-medium text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="identificacion"
                className="text-sm font-semibold text-slate-700"
              >
                Identificación
              </Label>

              <div className="relative">
                <BadgeCheck className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="identificacion"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ingresa tu identificación"
                  aria-invalid={Boolean(
                    errors.identificacion,
                  )}
                  disabled={isLoading}
                  className="h-11 border-slate-300 bg-white pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  {...register("identificacion")}
                />
              </div>

              {errors.identificacion && (
                <p className="text-xs font-medium text-red-600">
                  {errors.identificacion.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="telefono"
                className="text-sm font-semibold text-slate-700"
              >
                Teléfono
              </Label>

              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="telefono"
                  type="tel"
                  autoComplete="tel"
                  inputMode="numeric"
                  placeholder="Ingresa tu teléfono"
                  aria-invalid={Boolean(errors.telefono)}
                  disabled={isLoading}
                  className="h-11 border-slate-300 bg-white pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  {...register("telefono")}
                />
              </div>

              {errors.telefono && (
                <p className="text-xs font-medium text-red-600">
                  {errors.telefono.message}
                </p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label
                htmlFor="direccion"
                className="text-sm font-semibold text-slate-700"
              >
                Dirección
              </Label>

              <div className="relative">
                <Home className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="direccion"
                  type="text"
                  autoComplete="street-address"
                  placeholder="Calle principal y secundaria"
                  aria-invalid={Boolean(errors.direccion)}
                  disabled={isLoading}
                  className="h-11 border-slate-300 bg-white pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  {...register("direccion")}
                />
              </div>

              {errors.direccion && (
                <p className="text-xs font-medium text-red-600">
                  {errors.direccion.message}
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
                  autoComplete="new-password"
                  placeholder="Crea una contraseña"
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

            <div className="space-y-2">
              <Label
                htmlFor="password_confirmacion"
                className="text-sm font-semibold text-slate-700"
              >
                Confirmar contraseña
              </Label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="password_confirmacion"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repite tu contraseña"
                  aria-invalid={Boolean(
                    errors.password_confirmacion,
                  )}
                  disabled={isLoading}
                  className="h-11 border-slate-300 bg-white pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                  {...register("password_confirmacion")}
                />
              </div>

              {errors.password_confirmacion && (
                <p className="text-xs font-medium text-red-600">
                  {
                    errors.password_confirmacion
                      .message
                  }
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-6 py-6 sm:px-8">
            <Button
              type="submit"
              className="h-11 w-full bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-700"
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

            <p className="text-center text-sm text-slate-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
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

