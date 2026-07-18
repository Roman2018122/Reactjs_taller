// src/presentation/router/AppRouter.tsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@/presentation/pages/auth/LoginPage";
import RegisterPage from "@/presentation/pages/auth/RegisterPage";

import ClienteDashboard from "@/presentation/pages/cliente/ClienteDashboard";
import EmpleadoDashboard from "@/presentation/pages/empleado/EmpleadoDashboard";

import ProtectedRoute from "./ProtectedRoute";

import AppShell from "@/presentation/components/AppShell";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Autenticación sin AppShell */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/registro"
          element={<RegisterPage />}
        />

        {/* Rutas que comparten AppShell */}
        <Route element={<AppShell />}>
          {/* Dashboard del cliente */}
          <Route
            path="/cliente"
            element={
              <ProtectedRoute
                allowedRoles={["CLIENTE"]}
              >
                <ClienteDashboard />
              </ProtectedRoute>
            }
          />

          {/* Dashboard del empleado */}
          <Route
            path="/empleado"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "EMPLEADO",
                  "ADMIN",
                ]}
              >
                <EmpleadoDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Redirección temporal */}
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* Ruta no encontrada */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}