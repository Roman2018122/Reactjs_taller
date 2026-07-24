// src/presentation/router/AppRouter.tsx

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

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

import SolicitarServicioPage from "@/presentation/pages/cliente/SolicitarServicioPage";

import InicioPage from "@/presentation/pages/public/InicioPage";
import ServiciosPublicPage from "@/presentation/pages/public/ServiciosPublicPage";

import ProtectedRoute from "./ProtectedRoute";

import AppShell from "@/presentation/components/AppShell";
import PublicLayout from "@/presentation/components/layout/PublicLayout";

//Empleado
import VehiculosPagee from "@/presentation/pages/empleado/vehiculos/VehiculosPagee";
import ClientesPage from "@/presentation/pages/cliente/empleado/clientes/ClientesPage";
import ClienteFormPage from "@/presentation/pages/cliente/empleado/clientes/ClienteFormPage";
import ClienteDetallePage from "@/presentation/pages/cliente/empleado/clientes/ClienteDetallePage";
//import ClienteEditarPage from "@/presentation/pages/cliente/empleado/clientes/ClienteEditarPage";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas con navegación compartida */}
        <Route element={<PublicLayout />}>
          <Route
            index
            element={<InicioPage />}
          />

          <Route
            path="servicios"
            element={<ServiciosPublicPage />}
          />
        </Route>

        {/* Autenticación */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/registro"
          element={<RegisterPage />}
        />

        {/* Rutas privadas con AppShell */}
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

          {/* Nuevo vehículo */}
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

          {/* Citas del cliente */}
          <Route
            path="/cliente/citas"
            element={
              <ProtectedRoute
                allowedRoles={["CLIENTE"]}
              >
                <CitasPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cliente/citas/nueva"
            element={
              <ProtectedRoute
                allowedRoles={["CLIENTE"]}
              >
                <CitaFormPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cliente/citas/:id"
            element={
              <ProtectedRoute
                allowedRoles={["CLIENTE"]}
              >
                <CitaDetallePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cliente/citas/:id/editar"
            element={
              <ProtectedRoute
                allowedRoles={["CLIENTE"]}
              >
                <CitaEditarPage />
              </ProtectedRoute>
            }
          />

          {/* Órdenes del cliente */}
          <Route
            path="/cliente/ordenes"
            element={
              <ProtectedRoute
                allowedRoles={["CLIENTE"]}
              >
                <OrdenTrabajoClienteListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cliente/ordenes/:id"
            element={
              <ProtectedRoute
                allowedRoles={["CLIENTE"]}
              >
                <OrdenTrabajoClienteDetallePage />
              </ProtectedRoute>
            }
          />

          {/* Solicitud de servicio */}
          <Route
            path="/cliente/solicitar-servicio"
            element={
              <ProtectedRoute
                allowedRoles={["CLIENTE"]}
              >
                <SolicitarServicioPage />
              </ProtectedRoute>
            }
          />

          {/* Dashboard del empleado */}
          <Route
            path="/empleado/vehiculos"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "EMPLEADO",
                  "ADMIN",
                ]}
              >
                <VehiculosPagee />
              </ProtectedRoute>
            }
          />

          <Route
            path="/empleado/vehiculos/nuevo"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "EMPLEADO",
                  "ADMIN",
                ]}
              >
                <VehiculoFormPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/empleado/vehiculos/:id"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "EMPLEADO",
                  "ADMIN",
                ]}
              >
                <VehiculoDetallePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/empleado/vehiculos/:id/editar"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "EMPLEADO",
                  "ADMIN",
                ]}
              >
                <VehiculoEditarPage />
              </ProtectedRoute>
            }
          />
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
          {/* clientes empleado */}
          <Route
            path="/empleado/clientes"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "EMPLEADO",
                  "ADMIN",
                ]}
              >
                <ClientesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/empleado/clientes/nuevo"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "EMPLEADO",
                  "ADMIN",
                ]}
              >
                <ClienteFormPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/empleado/clientes/:id"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "EMPLEADO",
                  "ADMIN",
                ]}
              >
                <ClienteDetallePage />
              </ProtectedRoute>
            }
          />

          

          {/* Citas del empleado */}
          <Route
            path="/empleado/citas"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "EMPLEADO",
                  "ADMIN",
                ]}
              >
                <CitasEmpleadoPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/empleado/citas/:id"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "EMPLEADO",
                  "ADMIN",
                ]}
              >
                <CitaEmpleadoDetallePage />
              </ProtectedRoute>
            }
          />

          {/* Órdenes del empleado */}
          <Route
            path="/empleado/ordenes"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "EMPLEADO",
                  "ADMIN",
                ]}
              >
                <OrdenTrabajoEmpleadoListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/empleado/ordenes/:id"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "EMPLEADO",
                  "ADMIN",
                ]}
              >
                <OrdenTrabajoEmpleadoDetallePage />
              </ProtectedRoute>
            }
          />
        </Route>

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