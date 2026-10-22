/* eslint-disable react/no-unescaped-entities */
import { Button, Table } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../../controllers/hooks/use_auth";
import { useFormik } from "formik";
import Router from "next/router";
import { toast } from "react-toastify";
import { Producto, ResponseData } from "../../../models";
import HttpClient from "../../../controllers/utils/http_client";
import FormatedDate from "../../../controllers/utils/formated_date";
import { useState } from "react";

export const ProductosCreate = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, _setInitialValues] = useState<Producto>({
    nombre: "",
    tipo: "",
    stock: 0,
    valor: 0,
  });

  const formik = useFormik<Producto>({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData) => {
      setLoading(true);

      console.log(formData);

      if (formData.nombre === "") {
        toast.warning("Ingrese el nombre del producto");
        return;
      }

      if (formData.tipo === "") {
        toast.warning("Ingrese el tipo del producto");
        return;
      }
      if (formData.stock === 0) {
        toast.warning("Ingrese el stock del producto");
        return;
      }
      if (formData.valor === 0) {
        toast.warning("Ingrese el valor del producto");
        return;
      }
      const response: ResponseData = await HttpClient(
        `/api/productos`,
        "POST",
        auth.usuario,
        auth.rol,
        formData
      );

      if (response.success) {
        toast.success("Producto creado correctamente!");
        Router.back();
      } else {
        toast.warning(response.message);
      }

      setLoading(false);
    },
  });

  return (
    <>
      <title>Crear producto | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-auto mx-auto">
            <div className="mt-10">
              <p className="md:text-3xl text-xl text-center pt-5 font-extrabold text-blue-500">
                Crear producto
              </p>

              <div className="grid grid-cols-3 gap-4 px-4 py-2">
                <div>
                  <label>Nombre del producto</label>
                  <input
                    type="text"
                    placeholder="Nombre del producto"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Tipo del producto</label>
                  <input
                    type="text"
                    placeholder="Tipo del producto"
                    name="tipo"
                    value={formik.values.tipo}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>

                <div>
                  <label>Stock del producto</label>
                  <input
                    type="number"
                    placeholder="Stock del producto"
                    name="stock"
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>

                <div>
                  <label>Valor del producto</label>
                  <input
                    type="number"
                    placeholder="Valor del producto"
                    name="valor"
                    value={formik.values.valor}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <Button
                  className="text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-3 text-center mx-5 mb-5 mt-5 dark:focus:ring-blue-900"
                  onClick={() => formik.handleSubmit()}
                >
                  Guardar producto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductosCreate;
