import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Usuario, ModalProps, Medico } from "../../../models";
import { toast } from "react-toastify";
import { useAuth } from "../../../controllers/hooks/use_auth";
import theme from "../../../controllers/styles/theme";
import HttpClient from "../../../controllers/utils/http_client";

const initialUser: Usuario = {
  id: null,
  number: 0,
  usuario: "",
  contraseña: "",
  correo: "",
  telefono: "",
  medico: null,
  rol: 1,
  nombre: "",
  identificacion: "",
  estado: "",
};

interface Props extends ModalProps<Usuario> {
  initialData?: Usuario;
}

const UserModal = (props: Props) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [initialValues, setInitialValues] = useState<Usuario>(initialUser);

  const handleClose = () => {
    formik.resetForm({ values: initialUser });
    props.close();
  };

  const loadMedicos = async () => {
    setLoading(true);

    var response = await HttpClient(
      "/api/medicos",
      "GET",
      auth.usuario,
      auth.rol
    );

    const medicos: Array<Medico> = response.data ?? [];
    console.log(medicos);
    setMedicos(medicos);
    setLoading(false);
  };

  useEffect(() => {
    loadMedicos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // maneja los datos y comportamiento del formulario
  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData: Usuario) => {
      if (formData.nombre === "") {
        toast.warning("El nombre del traabajador no puede estar vacio");
        return;
      }

      if (formData.identificacion === "") {
        toast.warning("La cedula o ruc del traabajador no puede estar vacio");
        return;
      }

      if (formData.usuario === "") {
        toast.warning("Ingrese un nombre de usuario");
        return;
      }

      if (formData.contraseña === "") {
        toast.warning("Ingrese una contraseña para el usuario");
        return;
      }

      if (formData.estado === null) {
        toast.warning("Seleccione un estado para el usuario");
        return;
      }

      if (formData.rol === 3 && formData.medico === null) {
        toast.warning("Debe asignar un médico si el rol es Médico");
        return;
      }

      setLoading(true);
      console.log(formData);
      await props.onDone(formData);
      setLoading(false);
      handleClose();
    },
  });

  useEffect(() => {
    if (props.initialData) setInitialValues(props.initialData);
  }, [props.initialData]);

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          props.visible ? "" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded shadow-lg z-10 w-2/3 h-5/6 overflow-y-auto">
          <form onSubmit={formik.handleSubmit}>
            <div
              style={{ color: theme.colors.blue }}
              className="text-center text-xl mb-2 font-semibold"
            >
              Usuario
            </div>
            <hr />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-3">
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Nombre del usuario
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Nombre de Usuario"
                  name="nombre"
                  onChange={formik.handleChange}
                  value={formik.values.nombre}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Cedula o RUC
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Cedula o Ruc"
                  name="identificacion"
                  onChange={formik.handleChange}
                  value={formik.values.identificacion}
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Nombre de Usaurio
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Nombre de Usuario"
                  name="usuario"
                  onChange={formik.handleChange}
                  value={formik.values.usuario}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Contraseña
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="password"
                  placeholder="Password"
                  name="contraseña"
                  onChange={formik.handleChange}
                  value={formik.values.contraseña}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  E-mail
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="email"
                  placeholder="Correo electrónico"
                  name="correo"
                  onChange={formik.handleChange}
                  value={formik.values.correo}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Tipo de Rol
                </label>

                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  aria-label="Default select rol"
                  name="rol"
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    formik.setFieldValue("rol", value); // Actualiza el valor del rol
                    if (value !== 3) {
                      formik.setFieldValue("medico", null); // Limpia el médico si no es rol médico
                    }
                  }}
                  value={formik.values.rol}
                  defaultValue={1}
                >
                  <option value={1}>Secretaria</option>
                  <option value={2}>Gerente</option>
                  <option value={3}>Medico</option>
                  <option value={4}>Cliente</option>
                </select>
              </div>

              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Estado
                </label>

                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  aria-label="Default select role"
                  name="estado"
                  onChange={formik.handleChange}
                  value={formik.values.estado}
                >
                  <option value="" selected disabled>
                    Seleccione una opcion
                  </option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              {formik.values.rol === 3 && (
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Asignar Médico
                  </label>
                  <select
                    className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4"
                    name="medico"
                    onChange={(e) => {
                      const selectedMedico = medicos.find(
                        (medico) => medico.id === e.target.value
                      );
                      formik.setFieldValue("medico", selectedMedico || null);
                    }}
                    value={(formik.values.medico as Medico)?.id || ""}
                  >
                    <option value="" disabled>
                      Seleccione un médico
                    </option>
                    {medicos.map((medico) => (
                      <option key={medico.id} value={medico.id}>
                        {medico.nombres} - {medico.especialidad.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <hr />
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
              type="submit"
            >
              Guardar
            </button>
          </form>
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
            onClick={handleClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};
export default UserModal;
