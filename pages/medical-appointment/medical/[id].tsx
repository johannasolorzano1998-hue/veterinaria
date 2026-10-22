/* eslint-disable react/no-unescaped-entities */
import Router from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "../../../controllers/hooks/use_auth";
import HttpClient from "../../../controllers/utils/http_client";
import { Cita, ResponseData } from "../../../models";
import Sidebar from "../../components/sidebar";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import LoadingContainer from "../../components/loading_container";

const CitaMedical = () => {
  const [cita, setCita] = useState<Cita | null>(null);
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    diagnostico: "",
    detalle: "",
    tratamiento: "",
  });

  const loadData = async () => {
    if (Router.asPath !== Router.route) {
      setLoading(true);
      const solicitudeId = Router.query.id as string;
      const response: ResponseData = await HttpClient(
        "/api/cita/" + solicitudeId,
        "GET",
        auth.usuario,
        auth.rol
      );
      setCita(response.data);
      setForm({
        diagnostico: response.data.diagnostico || "",
        detalle: response.data.detalle || "",
        tratamiento: response.data.tratamiento || "",
      });
      setLoading(false);
    } else {
      setTimeout(loadData, 1000);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      diagnostico: "",
      detalle: "",
      tratamiento: "",
    },
    onSubmit: async (formData) => {
      setLoading(true);

      const updatedCita = {
        ...cita,
        diagnostico: formData.diagnostico,
        detalle: formData.detalle,
        tratamiento: formData.tratamiento,
      };

      const response: ResponseData = await HttpClient(
        "/api/cita/",
        "PUT",
        auth.usuario,
        auth.rol,
        updatedCita
      );

      if (response.success) {
        toast.success("Cita actualizada exitosamente.");
        Router.push("/medical-appointment");
      } else {
        toast.error("Error al actualizar la cita.");
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <title>Cita medica | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-auto mx-auto p-6 m-5 shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-blue-500 text-center mb-5">
              Cita Medica
            </h1>
            {loading ? (
              <div>
                <LoadingContainer visible={loading} miniVersion>
                  {" "}
                </LoadingContainer>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Datos de la Cita
                  </h2>
                  <p className="text-gray-600">
                    <span className="font-bold">Cliente:</span>{" "}
                    {cita?.cliente.nombre} {cita?.cliente.apellidos}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Mascota:</span>{" "}
                    {cita?.mascota.nombre}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Fecha:</span> {cita?.fecha}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Hora:</span> {cita?.hora}
                  </p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Diagnóstico
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows={3}
                      {...formik.getFieldProps("diagnostico")}
                      placeholder="Ingrese el diagnóstico"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Detalle
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows={3}
                      {...formik.getFieldProps("detalle")}
                      placeholder="Ingrese los detalles"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Tratamiento
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows={3}
                      {...formik.getFieldProps("tratamiento")}
                      placeholder="Ingrese el tratamiento"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CitaMedical;
