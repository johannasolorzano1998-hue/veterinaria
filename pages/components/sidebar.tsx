import {
  MdOutlineSpaceDashboard,
  MdOutlineSettings,
  MdOutlineLogout,
  MdPets,
  MdPeople,
  MdStore,
  MdAttachMoney,
  MdMedicalServices,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../../controllers/hooks/use_auth";
import { useCallback, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";

const Sidebar = () => {
  const { auth, logout } = useAuth();
  const [mostrarCarga, setMostrarCarga] = useState(false);
  const router = useRouter();

  const handleLogout = useCallback(() => {
    logout();
    Router.push("/");
  }, [logout]);

  const handleChanges = () => {
    setMostrarCarga(true);
    setTimeout(() => {
      setMostrarCarga(false);
    }, 10000);
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 left-0 lg:w-1/6">
      <p className="text-center mb-4">
        Usuario: <strong>{auth?.nombre}</strong>
      </p>
      <div className="flex flex-col justify-start">
        <h1 className="text-center font-bold text-xl">Menu</h1>

        <Link 
          href="/"
          className={`flex items-center gap-4 mb-2 px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white ${
            isActive("/") ? "bg-blue-500 text-white" : "text-gray-800"
          }`}
          onClick={handleChanges}
        >
          <MdOutlineSpaceDashboard className="text-2xl" />
          <span>Inicio</span>
        </Link>

        <Link 
          href="/clients"
          className={`flex items-center gap-4 mb-2 px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white ${
            isActive("/clients") ? "bg-blue-500 text-white" : "text-gray-600"
          }`}
          onClick={handleChanges}
        >
          <MdPeople className="text-2xl" />
          <span>Clientes</span>
        </Link>

        <Link 
          href="/mascotas"
          className={`flex items-center gap-4 mb-2 px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white ${
            isActive("/mascotas") ? "bg-blue-500 text-white" : "text-gray-800"
          }`}
          onClick={handleChanges}
        >
          <MdPets className="text-2xl" />
          <span>Mascotas</span>
        </Link>

        <Link 
          href="/medical-appointment"
          className={`flex items-center gap-4 mb-2 px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white ${
            isActive("/medical-appointment")
              ? "bg-blue-500 text-white"
              : "text-gray-800"
          }`}
          onClick={handleChanges}
        >
          <MdMedicalServices className="text-2xl" />
          <span>Citas</span>
        </Link>

        <Link 
          href="/medicos"
          className={`flex items-center gap-4 mb-2 px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white ${
            isActive("/medicos") ? "bg-blue-500 text-white" : "text-gray-800"
          }`}
          onClick={handleChanges}
        >
          <MdMedicalServices className="text-2xl" />
          <span>Médicos</span>
        </Link>

        <Link 
          href="/ventas"
          className={`flex items-center gap-4 mb-2 px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white ${
            isActive("/ventas") ? "bg-blue-500 text-white" : "text-gray-800"
          }`}
          onClick={handleChanges}
        >
          <MdStore className="text-2xl" />
          <span>Ventas</span>
        </Link>

        <Link 
          href="/productos"
          className={`flex items-center gap-4 mb-2 px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white ${
            isActive("/productos")
              ? "bg-blue-500 text-white"
              : "text-gray-800"
          }`}
          onClick={handleChanges}
        >
          <MdProductionQuantityLimits className="text-2xl" />
          <span>Productos</span>
        </Link>

        <Link 
          href="/pagos"
          className={`flex items-center gap-4 mb-2 px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white ${
            isActive("/pagos") ? "bg-blue-500 text-white" : "text-gray-800"
          }`}
          onClick={handleChanges}
        >
          <MdAttachMoney className="text-2xl" />
          <span>Pagos</span>
        </Link>

        <Link 
          href="/configuration"
          className={`flex items-center gap-4 mb-2 px-5 py-2 rounded-lg hover:bg-blue-500 hover:text-white ${
            isActive("/configuration")
              ? "bg-blue-500 text-white"
              : "text-gray-800"
          }`}
          onClick={handleChanges}
        >
          <MdOutlineSettings className="text-2xl" />
          <span>Configuración</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-5 py-2 mt-4 rounded-lg hover:bg-blue-500 hover:text-white text-gray-800"
        >
          <MdOutlineLogout className="text-2xl" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
      <footer className="absolute bottom-4 left-0 w-full text-center text-sm text-gray-500">
        © Desarrollado por Anthony Barcia 2024-2025
      </footer>
    </div>
  );
};

export default Sidebar;
