/* eslint-disable react/no-unescaped-entities */
import { Button } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../../controllers/hooks/use_auth";
import { useFormik } from "formik";
import Router from "next/router";
import { toast } from "react-toastify";
import { Cliente, ResponseData } from "../../../models";
import HttpClient from "../../../controllers/utils/http_client";
import { useState } from "react";

export const ClientCreate = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, _setInitialValues] = useState<Cliente>({
    number: 0,
    nombre: "",
    apellidos: "",
    cedula: "",
    fechaNacimiento: "",
    telefono: "",
    correo: "",
    mascotas: [],
  });

  const formik = useFormik<Cliente>({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData: Cliente) => {
      console.log(formData);
      setLoading(true);

      const payload = {
        ...formData,
      };
      console.log(payload);
      console.log(auth.usuario);
      console.log(auth.rol);
      const response: ResponseData = await HttpClient(
        "/api/client",
        "POST",
        auth.usuario,
        auth.rol,
        payload
      );
      if (response.success) {
        toast.success("Cliente creado correctamente!");
      } else {
        toast.warning(response.message);
      }
      setLoading(false);
      Router.back();
    },
  });

  return (
    <>
      <title>Crear cliente | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-5/6 mx-auto">
            <div className="mt-10">
              <p className="md:text-3xl text-xl text-center pt-5 font-extrabold text-blue-500">
                Crear cliente
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
                  <label>Apellidos</label>
                  <input
                    type="text"
                    placeholder="apellidos"
                    name="apellidos"
                    value={formik.values.apellidos}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Identificacion</label>
                  <input
                    type="text"
                    placeholder="cedula o RUC"
                    name="cedula"
                    value={formik.values.cedula}
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
                <div>
                  <label>Telefono</label>
                  <input
                    type="text"
                    placeholder="telefono"
                    value={formik.values.telefono}
                    name="telefono"
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Correo</label>
                  <input
                    type="text"
                    placeholder="correo"
                    name="correo"
                    value={formik.values.correo}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
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

export default ClientCreate;
