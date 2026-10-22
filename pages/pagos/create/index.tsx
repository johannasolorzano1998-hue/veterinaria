/* eslint-disable react/no-unescaped-entities */
import { Button, Table } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../../controllers/hooks/use_auth";
import { useFormik } from "formik";
import Router from "next/router";
import { toast } from "react-toastify";
import { Factura, Pago, ResponseData } from "../../../models";
import HttpClient from "../../../controllers/utils/http_client";
import FormatedDate from "../../../controllers/utils/formated_date";
import { useState } from "react";

export const PagosCreate = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [facturas, setFacturas] = useState<Array<Factura>>([]);
  const [newFactura, setNewFactura] = useState<Factura>({
    nombreProveedor: "",
    ruc: "",
    numeroFactura: "",
    valorFactura: 0,
    fechaFactura: "",
    detalleFactura: "",
  });
  const [initialValues, _setInitialValues] = useState<Pago>({
    number: 0,
    fechaCreacion: FormatedDate(),
    solicitante: auth?.nombre,
    facturas: null,
    valorTotal: 0,
  });

  const formik = useFormik<Pago>({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData) => {
      setLoading(true);
      formData.facturas = facturas;
      formData.valorTotal = facturas.reduce(
        (sum, factura) => sum + factura.valorFactura,
        0
      );

      if (formData.facturas.length === 0) {
        toast.warning("Debe ingresar al menos una factura");
        return;
      }
      console.log(formData);

      const response: ResponseData = await HttpClient(
        `/api/pagos`,
        "POST",
        auth.usuario,
        auth.rol,
        formData
      );

      if (response.success) {
        toast.success("Pago creado correctamente!");
        Router.back();
      } else {
        toast.warning(response.message);
      }

      setLoading(false);
    },
  });

  const handleAddFactura = () => {
    console.log(facturas);
    console.log(newFactura);
    if (newFactura.nombreProveedor === "") {
      toast.warning("Ingrese el nombre de un proveedor");
      return;
    }
    if (newFactura.ruc === "") {
      toast.warning("Ingrese el ruc del proveedor");
      return;
    }

    if (newFactura.numeroFactura === "") {
      toast.warning("Ingrese el numero de factura");
      return;
    }

    if (newFactura.valorFactura === 0) {
      toast.warning("Ingrese el valor de factura");
      return;
    }

    if (newFactura.fechaFactura === "") {
      toast.warning("Ingrese la fecha de la factura");
      return;
    }

    if (newFactura.detalleFactura === "") {
      toast.warning("Ingrese detalle de la factura de la factura");
      return;
    }
    setFacturas([...facturas, newFactura]);
    setNewFactura({
      nombreProveedor: "",
      ruc: "",
      numeroFactura: "",
      valorFactura: 0,
      fechaFactura: "",
      detalleFactura: "",
    });
  };

  return (
    <>
      <title>Crear pago | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-auto mx-auto">
            <div className="mt-10">
              <p className="md:text-3xl text-xl text-center pt-5 font-extrabold text-blue-500">
                Crear pago
              </p>

              <div className="grid grid-cols-3 gap-4 px-4 py-2">
                <div>
                  <label>Solicitante</label>
                  <input
                    type="text"
                    placeholder="nombre"
                    name="solicitante"
                    value={formik.values.solicitante}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div>
                  <label>Fecha de creacion</label>
                  <input
                    type="text"
                    placeholder="nombre"
                    name="fechaCreacion"
                    value={formik.values.fechaCreacion}
                    onChange={formik.handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
              </div>

              <p className="md:text-3xl text-xl text-center pt-2 font-extrabold text-blue-500">
                Facturas
              </p>

              <p className="px-5 pt-2 font-semibold text-blue-500">
                Llena las casillas y dale agregar factura para agregar una
                factura a la tabla de las facturas, cada que ingreses una
                factura los campos volveran a estar vacios para seguir agregando
                las facturas que desees.
              </p>

              {/* Formulario para agregar facturas */}
              <div className="grid grid-cols-6 gap-2 px-4 py-2">
                <input
                  type="text"
                  placeholder="Proveedor"
                  value={newFactura.nombreProveedor}
                  onChange={(e) =>
                    setNewFactura({
                      ...newFactura,
                      nombreProveedor: e.target.value,
                    })
                  }
                  className="col-span-1 shadow-sm bg-gray-50 border rounded-lg p-2.5"
                />
                <input
                  type="text"
                  placeholder="RUC"
                  value={newFactura.ruc}
                  onChange={(e) =>
                    setNewFactura({ ...newFactura, ruc: e.target.value })
                  }
                  className="col-span-1 shadow-sm bg-gray-50 border rounded-lg p-2.5"
                />
                <input
                  type="text"
                  placeholder="Número Factura"
                  value={newFactura.numeroFactura}
                  onChange={(e) =>
                    setNewFactura({
                      ...newFactura,
                      numeroFactura: e.target.value,
                    })
                  }
                  className="col-span-1 shadow-sm bg-gray-50 border rounded-lg p-2.5"
                />
                <input
                  type="number"
                  placeholder="Valor"
                  value={newFactura.valorFactura}
                  onChange={(e) =>
                    setNewFactura({
                      ...newFactura,
                      valorFactura: parseFloat(e.target.value),
                    })
                  }
                  className="col-span-1 shadow-sm bg-gray-50 border rounded-lg p-2.5"
                />
                <input
                  type="date"
                  placeholder="Fecha"
                  value={newFactura.fechaFactura}
                  onChange={(e) =>
                    setNewFactura({
                      ...newFactura,
                      fechaFactura: e.target.value,
                    })
                  }
                  className="col-span-1 shadow-sm bg-gray-50 border rounded-lg p-2.5"
                />
                <input
                  type="text"
                  placeholder="Detalle"
                  value={newFactura.detalleFactura}
                  onChange={(e) =>
                    setNewFactura({
                      ...newFactura,
                      detalleFactura: e.target.value,
                    })
                  }
                  className="col-span-1 shadow-sm bg-gray-50 border rounded-lg p-2.5"
                />
                <Button
                  onClick={handleAddFactura}
                  className="text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center mx-2 mb-2 mt-3 dark:focus:ring-blue-900"
                >
                  Agregar Factura
                </Button>
              </div>

              <p className="md:text-3xl text-xl text-center py-2 font-extrabold text-blue-500">
                Tabla de facturas
              </p>

              {/* Tabla de facturas */}
              <table className="table-auto w-11/12 border-collapse border border-gray-200 rounded-lg shadow-md mx-auto">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Proveedor
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      RUC
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Número Factura
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Valor
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Fecha
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Detalle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {facturas.map((factura, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-100`}
                    >
                      <td className="border border-gray-200 px-4 py-2">
                        {factura.nombreProveedor}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {factura.ruc}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {factura.numeroFactura}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {factura.valorFactura}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {factura.fechaFactura}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {factura.detalleFactura}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="grid grid-cols-4 gap-4">
                <Button
                  className="text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-3 text-center mx-5 mb-5 mt-5 dark:focus:ring-blue-900"
                  onClick={() => formik.handleSubmit()}
                >
                  Guardar pago
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PagosCreate;
