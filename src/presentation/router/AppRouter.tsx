// src/presentation/router/AppRouter.tsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@/presentation/pages/auth/LoginPage";
import RegisterPage from "@/presentation/pages/auth/RegisterPage";

import ClienteDashboard from "@/presentation/pages/cliente/ClienteDashboard";
import EmpleadoDashboard from "@/presentation/pages/empleado/EmpleadoDashboard";

import VehiculosPage from "@/presentation/pages/vehiculos/VehiculosPage";
import VehiculoFormPage from "@/presentation/pages/vehiculos/VehiculoFormPage";


import VehiculoDetallePage from "@/presentation/pages/vehiculos/VehiculoDetallePage";
import VehiculoEditarPage from "@/presentation/pages/vehiculos/VehiculoEditarPage";

import CitasPage from "@/presentation/pages/cliente/citas/CitasPage";
import CitaFormPage from "@/presentation/pages/cliente/citas/CitaFormPage";
import CitaDetallePage from "@/presentation/pages/cliente/citas/CitaDetallePage";
import CitaEditarPage from "@/presentation/pages/cliente/citas/CitaEditarPage";

import CitasEmpleadoPage from "@/presentation/pages/empleado/citas/CitasEmpleadoPage";
import CitaEmpleadoDetallePage from "@/presentation/pages/empleado/citas/CitaEmpleadoDetallePage";


import OrdenTrabajoEmpleadoListPage from "@/presentation/pages/empleado/ordenes/OrdenTrabajoEmpleadoListPage";
import OrdenTrabajoEmpleadoDetallePage from "@/presentation/pages/empleado/ordenes/OrdenTrabajoEmpleadoDetallePage";


import OrdenTrabajoClienteListPage from "@/presentation/pages/cliente/ordenes/OrdenTrabajoClienteListPage";
import OrdenTrabajoClienteDetallePage from "@/presentation/pages/cliente/ordenes/OrdenTrabajoClienteDetallePage";

import InicioPage from "@/presentation/pages/public/InicioPage";

import ServiciosPublicPage from "@/presentation/pages/public/ServiciosPublicPage";

import ProtectedRoute from "./ProtectedRoute";

import AppShell from "@/presentation/components/AppShell";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<InicioPage />}
        />

        <Route
          path="/servicios"
          element={<ServiciosPublicPage />}
        />

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

          
          {/* Vehículos */}
            <Route
              path="/cliente/vehiculos"
              element={
                <ProtectedRoute
                  allowedRoles={["CLIENTE"]}
                >
                  <VehiculosPage />
                </ProtectedRoute>
              }
            />
            
            ## Nuevo vehiculo
            <Route
              path="/cliente/vehiculos/nuevo"
              element={
                <ProtectedRoute
                  allowedRoles={["CLIENTE"]}
                >
                  <VehiculoFormPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cliente/vehiculos/:id"
              element={
                <ProtectedRoute
                  allowedRoles={["CLIENTE"]}
                >
                  <VehiculoDetallePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cliente/vehiculos/:id/editar"
              element={
                <ProtectedRoute
                  allowedRoles={["CLIENTE"]}
                >
                  <VehiculoEditarPage />
                </ProtectedRoute>
              }
            
            />
            <Route
              path="/cliente/citas"
              element={<CitasPage />}
            />

            <Route
              path="/cliente/citas/nueva"
              element={<CitaFormPage />}
            />

            <Route
              path="/cliente/citas/:id"
              element={<CitaDetallePage />}
            />

            <Route
              path="/cliente/citas/:id/editar"
              element={<CitaEditarPage />}
            />

            <Route
              path="/cliente/ordenes"
              element={
                <OrdenTrabajoClienteListPage />
              }
            />
            <Route
              path="/cliente/ordenes/:id"
              element={
                <OrdenTrabajoClienteDetallePage />
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
        <Route
          path="/empleado/citas"
          element={<CitasEmpleadoPage />}
        />

        <Route
          path="/empleado/citas/:id"
          element={<CitaEmpleadoDetallePage />}
        />

        <Route
          path="/empleado/ordenes"
          element={<OrdenTrabajoEmpleadoListPage />}
        />

        <Route
          path="/empleado/ordenes/:id"
          element={<OrdenTrabajoEmpleadoDetallePage />}
        />


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