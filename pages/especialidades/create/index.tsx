/* eslint-disable react/no-unescaped-entities */
import { Button } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../../controllers/hooks/use_auth";
import { useFormik } from "formik";
import Router from "next/router";
import { toast } from "react-toastify";
import { Cliente, Especialidad, Mascota, ResponseData } from "../../../models";
import HttpClient from "../../../controllers/utils/http_client";
import { useEffect, useState } from "react";

export const EspecialidadesCreate = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, _setInitialValues] = useState<Especialidad>({
    nombre: "",
  });

  const formik = useFormik<Especialidad>({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData) => {
      setLoading(true);

      // Hacer la solicitud PUT al backend
      const response: ResponseData = await HttpClient(
        `/api/especialidades`,
        "POST",
        auth.usuario,
        auth.rol,
        formData
      );

      if (response.success) {
        toast.success("Especialidad creada correctamente!");
        Router.back();
      } else {
        toast.warning(response.message);
      }

      setLoading(false);
    },
  });

  return (
    <>
      <title>Crear especialidad | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-5/6 mx-auto">
            <div className="mt-10">
              <p className="md:text-3xl text-xl text-center pt-5 font-extrabold text-blue-500">
                Crear especialidad
              </p>
            
              <div className="grid grid-cols-3 gap-4 px-4 py-2">
                <div>
                  <label>Nombre de la especialidad</label>
                  <input
                    type="text"
                    placeholder="nombre"
                    name="nombre"
                    value={formik.values.nombre}
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
                  Guardar especialidad
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EspecialidadesCreate;
