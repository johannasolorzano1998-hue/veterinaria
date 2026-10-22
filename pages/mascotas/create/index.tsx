/* eslint-disable react/no-unescaped-entities */
import { Button } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../../controllers/hooks/use_auth";
import { useFormik } from "formik";
import Router from "next/router";
import { toast } from "react-toastify";
import { Cliente, Mascota, ResponseData } from "../../../models";
import HttpClient from "../../../controllers/utils/http_client";
import { useEffect, useState } from "react";

export const MascotasCreate = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [initialValues, _setInitialValues] = useState<Mascota>({
    number: 0,
    nombre: "",
    tipo: "",
    raza: "",
    fechaNacimiento: "",
  });

  const formik = useFormik<Mascota & { clienteId: string }>({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      ...initialValues,
      clienteId: "", // Para el ID del cliente
    },
    onSubmit: async (formData) => {
      setLoading(true);
  
      // Obtener el cliente seleccionado
      const cliente = clientes.find((c) => c.id === formData.clienteId);
      if (!cliente) {
        toast.error("Cliente no encontrado");
        setLoading(false);
        return;
      }
  
      // Agregar la nueva mascota al arreglo de mascotas del cliente
      const updatedCliente = {
        _id: cliente._id || cliente.id,
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
        cedula: cliente.cedula,
        fechaNacimiento: cliente.fechaNacimiento,
        telefono: cliente.telefono,
        correo: cliente.correo,
        number: cliente.number,
        mascotas: [
          ...cliente.mascotas.map((m: any) => ({
            _id: m._id,
            nombre: m.nombre,
            tipo: m.tipo,
            raza: m.raza,
            fechaNacimiento: m.fechaNacimiento,
            number: m.number,
          })),
          {
            nombre: formData.nombre,
            tipo: formData.tipo,
            raza: formData.raza,
            fechaNacimiento: formData.fechaNacimiento,
            number: cliente.mascotas.length + 1,
          },
        ],
      };
  
      // Hacer la solicitud PUT al backend
      const response: ResponseData = await HttpClient(
        `/api/client`,
        "PUT",
        auth.usuario,
        auth.rol,
        updatedCliente
      );
      console.log(formData.clienteId)
      console.log(updatedCliente)
      console.log(response)
  
      if (response.success) {
        toast.success("Mascota asignada correctamente!");
        Router.back();
      } else {
        toast.warning(response.message);
      }
  
      setLoading(false);
    },
  });
  


  const loadData = async () => {
    setLoading(true);

    var response = await HttpClient(
      "/api/client",
      "GET",
      auth.usuario,
      auth.rol
    );

    const clientesData: Array<Cliente> = response.data ?? [];
    setClientes(clientesData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <title>Crear mascota | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-5/6 mx-auto">
            <div className="mt-10">
              <p className="md:text-3xl text-xl text-center pt-5 font-extrabold text-blue-500">
                Crear mascota
              </p>
              <p className="md:text-xl text-lg pt-5 font-bold text-blue-500">
                Datos de la mascota
              </p>
              <div className="grid grid-cols-3 gap-4 px-4 py-2">
                <div>
                  <label>Nombres</label>
                  <input
                    type="text"
                    placeholder="nombre"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>

                <div>
                  <label>Tipo</label>
                  <input
                    type="text"
                    placeholder="Tipo"
                    name="tipo"
                    value={formik.values.tipo}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>

                <div>
                  <label>Raza</label>
                  <input
                    type="text"
                    placeholder="Raza"
                    name="raza"
                    value={formik.values.raza}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>

                <div>
                  <label>Fecha de nacimiento</label>
                  <input
                    type="date"
                    placeholder="fecha"
                    name="fechaNacimiento"
                    value={formik.values.fechaNacimiento}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
              </div>
              <p className="md:text-xl text-lg pt-5 font-bold text-blue-500">
                Propietario
              </p>
              <div className="grid grid-cols-3 gap-4 px-4 py-2">
              <div>
                <label>Seleccione un cliente</label>
                <select
                  name="clienteId"
                  value={formik.values.clienteId}
                  onChange={formik.handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">Seleccione un cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nombre} {cliente.apellidos}
                    </option>
                  ))}
                </select>
              </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <Button
                  className="text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center mx-2 mb-2 mt-3 dark:focus:ring-blue-900"
                  onClick={() => formik.handleSubmit()}
                >
                  Guardar cliente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MascotasCreate;
