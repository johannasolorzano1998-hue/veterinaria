/* eslint-disable react/no-unescaped-entities */
import { Button } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../../controllers/hooks/use_auth";
import { useFormik } from "formik";
import Router from "next/router";
import { toast } from "react-toastify";
import { Cliente, ResponseData } from "../../../models";
import HttpClient from "../../../controllers/utils/http_client";
import { useEffect, useState } from "react";
import LoadingContainer from "../../components/loading_container";

export const ClientEdit = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [cliente, setCliente] = useState<Cliente | null>(null);

  const formik = useFormik<Cliente>({
    enableReinitialize: true,
    initialValues: cliente || {
      number: 0,
      nombre: "",
      apellidos: "",
      cedula: "",
      fechaNacimiento: "",
      telefono: "",
      correo: "",
      mascotas: [],
    },
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (formData: Cliente) => {
      setLoading(true);

      const payload = { ...formData };
      console.log(payload);

      const response: ResponseData = await HttpClient(
        "/api/client",
        "PUT",
        auth.usuario,
        auth.rol,
        payload
      );

      if (response.success) {
        toast.success("Cliente actualizado correctamente!");
        Router.back();
      } else {
        toast.warning(response.message);
      }

      setLoading(false);
    },
  });

  const loadData = async () => {
    if (Router.asPath !== Router.route) {
      setLoading(true);
      const solicitudeId = Router.query.id as string;
      const response: ResponseData = await HttpClient(
        "/api/client/" + solicitudeId,
        "GET",
        auth.usuario,
        auth.rol
      );
      setCliente(response.data);
      console.log(response.data);
      setLoading(false);
    } else {
      setTimeout(loadData, 1000);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <title>Editar cliente | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-auto mx-auto p-6 rounded-lg shadow-md">
            <div className="mt-10">
              <p className="text-3xl font-bold text-blue-500 text-center mb-5">
                Editar cliente
              </p>
              {loading ? (
                <div>
                  <LoadingContainer visible={loading} miniVersion>
                    {" "}
                  </LoadingContainer>
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-3 gap-4 px-4 py-2">
                    <div>
                      <label className="block mb-2">Nombres</label>
                      <input
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Apellidos</label>
                      <input
                        type="text"
                        placeholder="Apellidos"
                        name="apellidos"
                        value={formik.values.apellidos}
                        onChange={formik.handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Identificación</label>
                      <input
                        type="text"
                        placeholder="Cédula o RUC"
                        name="cedula"
                        value={formik.values.cedula}
                        onChange={formik.handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Fecha de Nacimiento</label>
                      <input
                        type="date"
                        placeholder="Fecha de Nacimiento"
                        name="fechaNacimiento"
                        value={formik.values.fechaNacimiento}
                        onChange={formik.handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Teléfono</label>
                      <input
                        type="text"
                        placeholder="Teléfono"
                        name="telefono"
                        value={formik.values.telefono}
                        onChange={formik.handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Correo</label>
                      <input
                        type="email"
                        placeholder="Correo"
                        name="correo"
                        value={formik.values.correo}
                        onChange={formik.handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <Button
                      type="submit"
                      className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Guardar Cambios
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientEdit;
