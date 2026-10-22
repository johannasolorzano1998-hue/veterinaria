/* eslint-disable react/no-unescaped-entities */
import Router from "next/router";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../../../controllers/hooks/use_auth";
import HttpClient from "../../../controllers/utils/http_client";
import {
  Cita,
  Cliente,
  Especialidad,
  Medico,
  ResponseData,
} from "../../../models";
import Sidebar from "../../components/sidebar";
import { useFormik } from "formik";

type Props = {
  dates: Array<string>;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  inTabs?: boolean;
};

export const CitasPages = (props: Props) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);

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

  const loadClient = async () => {
    setLoading(true);

    var response = await HttpClient(
      "/api/client",
      "GET",
      auth.usuario,
      auth.rol
    );

    const client: Array<Cliente> = response.data ?? [];
    console.log(client);
    setClientes(client);
    setLoading(false);
  };

  const loadEspecialidades = async () => {
    setLoading(true);

    var response = await HttpClient(
      "/api/especialidades",
      "GET",
      auth.usuario,
      auth.rol
    );

    const especialidad: Array<Especialidad> = response.data ?? [];
    console.log(especialidad);
    setEspecialidades(especialidad);
    setLoading(false);
  };

  const loadCitas = async () => {
    setLoading(true);

    var response = await HttpClient("/api/cita", "GET", auth.usuario, auth.rol);

    const citas: Array<Cita> = response.data ?? [];
    console.log(citas);
    setCitas(citas);
    setLoading(false);
  };

  useEffect(() => {
    loadClient();
    loadMedicos();
    loadEspecialidades();
    loadCitas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [initialValues, _setInitialValues] = useState<Cita>({
    number: 0,
    cliente: {
      number: 0,
      nombre: "",
      apellidos: "",
      cedula: "",
      fechaNacimiento: "",
      telefono: "",
      correo: "",
      mascotas: [],
    },
    mascota: null,
    fecha: "",
    hora: "",
    diagnostico: "",
    medico: null,
    especialidad: {
      nombre: "",
    },
    tratamiento: "",
    detalle: "",
    valor: 0,
  });

  const formik = useFormik<Cita>({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData) => {
      console.log(formData);
      setLoading(true);
      const response = await HttpClient(
        `/api/cita`,
        "POST",
        auth.usuario,
        auth.rol,
        formData
      );

      if (response.success) {
        toast.success("Cita creada correctamente!");
        Router.push("/medical-appointment")
      } else {
        toast.warning(response.message);
      }
      setLoading(false);
    },
  });

  const handleSearchCliente = (cedula: string) => {
    const cliente = clientes.find((c) => c.cedula === cedula);
    setSelectedCliente(cliente || null);

    if (cliente) {
      // Asignar el cliente al campo `cliente` de formik
      formik.setFieldValue("cliente", cliente);
      // Reiniciar el campo mascota en caso de cambiar de cliente
      formik.setFieldValue("mascota", null);
    }
  };

  const handleEspecialidadChange = (id: string) => {
    const selectedEspecialidad = especialidades.find((e) => e.id === id);
    formik.setFieldValue("especialidad", selectedEspecialidad);

    if (selectedEspecialidad) {
      // Buscar el médico correspondiente a la especialidad seleccionada
      const medico = medicos.find(
        (m) => m.especialidad.nombre === selectedEspecialidad.nombre
      );
      formik.setFieldValue("medico", medico || null); // Asignar el médico al formData
    }
  };

  const handleFechaChange = (fecha: string) => {
    formik.setFieldValue("fecha", fecha);

    const especialidad = formik.values.especialidad;
    if (especialidad) {
      calcularHorasDisponibles(fecha, especialidad.nombre);
    }
  };

  const calcularHorasDisponibles = (fecha: string, especialidad: string) => {
    const rangoHoras = especialidad === "Cirugía" ? 2 : 0.5; // Duración en horas
    const citasDelDia = citas.filter(
      (cita) =>
        cita.fecha === fecha && cita.especialidad.nombre === especialidad
    );

    const inicio = 8; // 8:00 AM
    const fin = 17; // 5:00 PM
    const intervalos: string[] = [];

    for (let hora = inicio; hora < fin; hora += rangoHoras) {
      const horas = Math.floor(hora);
      const minutos = (hora % 1) * 60;
      const horaInicio = `${horas.toString().padStart(2, "0")}:${Math.round(
        minutos
      )
        .toString()
        .padStart(2, "0")}`;

      const horaFin = `${Math.floor(horas + rangoHoras)
        .toString()
        .padStart(2, "0")}:${Math.round(((horas + rangoHoras) % 1) * 60)
        .toString()
        .padStart(2, "0")}`;

      const horaOcupada = citasDelDia.some(
        (cita) => cita.hora >= horaInicio && cita.hora < horaFin
      );

      if (!horaOcupada) {
        intervalos.push(horaInicio);
      }
    }

    setHorasDisponibles(intervalos);
  };

  return (
    <>
      <title>Crear cita | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-auto mx-auto p-2 m-5">
            <p className="md:text-4xl text-xl text-center pt-3 font-extrabold text-blue-500">
              Crear cita
            </p>
            <p className="md:text-xl text-lg pt-3 font-bold text-blue-500">
              Propietario y paciente
            </p>
            <div className="grid grid-cols-3 gap-4 px-4 py-2">
              <div>
                <label>Cédula del propietario</label>
                <input
                  type="text"
                  placeholder="Ingrese cédula"
                  onBlur={(e) => handleSearchCliente(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                {selectedCliente && (
                  <>
                    <label>Mascotas</label>
                    <select
                      name="mascota"
                      onChange={(e) => {
                        const mascota = selectedCliente.mascotas.find(
                          (m) => m.id === e.target.value
                        );
                        formik.setFieldValue("mascota", mascota);
                      }}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option value="">Seleccione una mascota</option>
                      {selectedCliente.mascotas.map((mascota) => (
                        <option key={mascota.id} value={mascota.id}>
                          {mascota.nombre}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            </div>
            <p className="md:text-xl text-lg pt-3 font-bold text-blue-500">
              Fecha
            </p>
            <div className="grid grid-cols-3 gap-4 px-4 py-2">
              <div>
                <label>Especialidad</label>
                <select
                  name="especialidad"
                  onChange={(e) => handleEspecialidadChange(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">Seleccione una especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>
                      {especialidad.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={formik.values.fecha}
                  onChange={(e) => handleFechaChange(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            </div>

            {formik.values.medico && (
              <div className="mt-4">
                <p className="text-lg font-bold text-blue-500">
                  Médico asignado
                </p>
                <div className="grid grid-cols-3 gap-4 px-4 py-2">
                  <div>
                    <label>Nombre</label>
                    <input
                      type="text"
                      value={formik.values.medico.nombres}
                      readOnly
                      className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label>Correo</label>
                    <input
                      type="text"
                      value={formik.values.medico.correo}
                      readOnly
                      className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label>Teléfono</label>
                    <input
                      type="text"
                      value={formik.values.medico.telefono}
                      readOnly
                      className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                </div>
              </div>
            )}
            <p className="md:text-xl text-lg pt-3 font-bold text-blue-500">
              Disponibilidad
            </p>
            <div>
              <label>Horas disponibles</label>
              <div className="grid grid-cols-6 gap-4 px-4 py-2">
                {horasDisponibles.map((hora) => (
                  <div key={hora}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="hora" // Cambiado a `radio` para asegurar una única selección
                        value={hora}
                        onChange={() => formik.setFieldValue("hora", hora)}
                        checked={formik.values.hora === hora}
                        className="form-radio text-blue-500"
                      />
                      <span>{hora}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <p className="md:text-xl text-lg pt-3 font-bold text-blue-500">
              Valor de la cita
            </p>
            <div className="grid grid-cols-3 gap-4 px-4 py-2">
              <div>
                <label>Valor</label>
                <input
                  type="number"
                  placeholder="Ingrese cédula"
                  name="valor"
                  value={formik.values.valor}
                  onChange={formik.handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            </div>
            <Button
              onClick={() => formik.handleSubmit()}
              className="text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center mx-2 mb-2 mt-3 dark:focus:ring-blue-900"
            >
              Crear cita
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CitasPages;
