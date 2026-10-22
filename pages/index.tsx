/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import Router from "next/router";
import { useAuth } from "../controllers/hooks/use_auth";
import { useState } from "react";
import GeneralReportModal from "./components/modals/reportPagos";
import { CheckPermissions } from "../controllers/utils/check_permissions";
import { toast } from "react-toastify";
import ReportPagos from "./components/modals/reportPagos";
import ReportVentas from "./components/modals/reportVentas";
import Sidebar from "./components/sidebar";

export default function Home() {
  const { auth } = useAuth();
  const [modalVisiblePagos, setModalVisiblePagos] = useState<boolean>(false);
  const [modalVisibleVentas, setModalVisibleVentas] = useState<boolean>(false);

  const showModalPagos = () => setModalVisiblePagos(true);
  const showModalVentas = () => setModalVisibleVentas(true);

  const handlePagos = () => {
    CheckPermissions(auth, [0, 1])
      ? Router.push("/pagos")
      : toast.error("No tienes permiso para entrar aqui");
  };

  const handleCitas = () => {
    CheckPermissions(auth, [0, 1, 3])
      ? Router.push("/medical-appointment")
      : toast.error("No tienes permiso para entrar aqui");
  };

  const handleClientes = () => {
    CheckPermissions(auth, [0, 1])
      ? Router.push("/clients")
      : toast.error("No tienes permiso para entrar aqui");
  };

  const handleMascotas = () => {
    CheckPermissions(auth, [0, 1])
      ? Router.push("/mascotas")
      : toast.error("No tienes permiso para entrar aqui");
  };

  const handleEspecialidad = () => {
    CheckPermissions(auth, [0, 1])
      ? Router.push("/especialidades")
      : toast.error("No tienes permiso para entrar aqui");
  };

  const handleMedicos = () => {
    CheckPermissions(auth, [0, 1])
      ? Router.push("/medicos")
      : toast.error("No tienes permiso para entrar aqui");
  };

  const handleProductos = () => {
    CheckPermissions(auth, [0, 1])
      ? Router.push("/productos")
      : toast.error("No tienes permiso para entrar aqui");
  };

  const handleVentas = () => {
    CheckPermissions(auth, [0, 1])
      ? Router.push("/ventas")
      : toast.error("No tienes permiso para entrar aqui");
  };

  const handleConfiguracion = () => {
    CheckPermissions(auth, [0])
      ? Router.push("/configuration")
      : toast.error("No tienes permiso para entrar aqui");
  };

  return (
    <>
      <title>Inicio | Oh My Dog</title>
      <div className="flex h-full">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 p-6 bg-blue-100">
          <div className="bg-white w-full rounded-xl shadow-2xl p-8 mb-8">
            <div className="flex items-center mb-8">
              <p className="text-3xl text-center text-blue-800 font-bold w-full">
                <strong>Sistema de Gestión Veterinaria</strong> |{" "}
                <em className="text-blue-600">"Oh My Dog"</em>
              </p>
              <hr className="mt-4 mb-6 border-t-2 border-blue-300" />
            </div>

            {/* Modulos de Gestión */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Citas */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Gestión de Citas
                </h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleCitas}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Ver Citas Programadas
                  </button>
                  <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Historial de Citas
                  </button>
                </div>
              </div>

              {/* Especialidades */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Especialidades
                </h2>
                <button
                  onClick={handleEspecialidad}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full"
                >
                  Ver Especialidades
                </button>
              </div>

              {/* Médicos */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Médicos
                </h2>
                <button
                  onClick={handleMedicos}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full"
                >
                  Ver Médicos
                </button>
              </div>

              {/* Clientes */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Clientes
                </h2>
                <button
                  onClick={handleClientes}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full"
                >
                  Ver Clientes
                </button>
              </div>

              {/* Mascotas */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Mascotas
                </h2>
                <button
                  onClick={handleMascotas}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full"
                >
                  Ver Mascotas
                </button>
              </div>

              {/* Pagos */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Pagos
                </h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handlePagos}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Ver Pagos Realizados
                  </button>
                  <button
                    onClick={showModalPagos}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Ver Reportes de Pagos
                  </button>
                </div>
              </div>

              {/* Productos */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Productos
                </h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleProductos}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Ver productos
                  </button>
                </div>
              </div>

              {/* Ventas */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Ventas
                </h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleVentas}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Ver Ventas Realizadas
                  </button>
                  <button
                    onClick={showModalVentas}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Reportes de Ventas
                  </button>
                </div>
              </div>

              {/* Configuracion */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Configuracion
                </h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleConfiguracion}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Ir a Configuracion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReportPagos
        visible={modalVisiblePagos}
        close={() => {
          setModalVisiblePagos(null);
        }}
      />

      <ReportVentas
        visible={modalVisibleVentas}
        close={() => {
          setModalVisibleVentas(null);
        }}
      />
    </>
  );
}
