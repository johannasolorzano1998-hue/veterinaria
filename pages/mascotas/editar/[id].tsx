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
import LoadingContainer from "../../components/loading_container";

export const MascotasEdit = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [mascota, setMascota] = useState<Mascota | null>(null);

  const loadData = async () => {
    if (Router.asPath !== Router.route) {
      setLoading(true);
      const mascotaId = Router.query.id as string;
      console.log(mascotaId);
      // Llama a la API para obtener la mascota y el cliente
      const response: ResponseData = await HttpClient(
        `/api/mascotas/${mascotaId}`,
        "GET",
        auth.usuario,
        auth.rol
      );

      console.log(response);
      if (response.success) {
        const { cliente, mascota } = response.data;

        // Transformar _id a id para la mascota
        const transformedMascota = { ...mascota, id: mascota._id };

        // Transformar _id a id en las mascotas del cliente
        const transformedCliente = {
          ...cliente,
          mascotas: cliente.mascotas.map((m: any) => ({
            ...m,
            id: m._id,
          })),
        };
        setCliente(transformedCliente);
        setMascota(transformedMascota);
      } else {
        toast.error("Mascota no encontrada.");
        //Router.back();
      }

      setLoading(false);
    } else {
      setTimeout(loadData, 1000);
    }
  };

  const formik = useFormik<Mascota>({
    enableReinitialize: true,
    initialValues: mascota || {
      number: 0,
      nombre: "",
      tipo: "",
      raza: "",
      fechaNacimiento: "",
    },
    onSubmit: async (formData) => {
      if (!cliente) {
        toast.error("Cliente no encontrado");
        return;
      }

      setLoading(true);

      // Actualizar los datos de la mascota específica
      const updatedMascotas = cliente.mascotas.map((m) => {
        if (m.id === mascota?.id || m._id === mascota?.id) {
          // Solo actualiza la mascota con el ID correspondiente
          return {
            _id: m._id, // Preservar el _id existente
            nombre: formData.nombre,
            tipo: formData.tipo,
            raza: formData.raza,
            fechaNacimiento: formData.fechaNacimiento,
            number: m.number,
          };
        }
        // Limpiar las demás mascotas también
        return {
          _id: m._id,
          nombre: m.nombre,
          tipo: m.tipo,
          raza: m.raza,
          fechaNacimiento: m.fechaNacimiento,
          number: m.number,
        };
      });

      const updatedCliente = {
        _id: cliente._id || cliente.id,
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
        cedula: cliente.cedula,
        fechaNacimiento: cliente.fechaNacimiento,
        telefono: cliente.telefono,
        correo: cliente.correo,
        number: cliente.number,
        mascotas: updatedMascotas,
      };
      console.log("Cliente actualizado:", updatedCliente);

      // Hacer la solicitud PUT al backend
      const response: ResponseData = await HttpClient(
        `/api/client`,
        "PUT",
        auth.usuario,
        auth.rol,
        updatedCliente
      );
      
      if (response.success) {
        toast.success("Mascota actualizada correctamente!");
        Router.push(`/mascotas`);
      } else {
        toast.warning(response.message);
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
      <title>Editar mascota | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-auto mx-auto p-6 rounded-lg shadow-md">
            <div className="mt-10">
              <p className="text-3xl font-bold text-blue-500 text-center mb-5">
                Editar mascota
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
                      <label>Nombres</label>
                      <input
                        type="text"
                        placeholder="nombre"
                        name="nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

export default MascotasEdit;
