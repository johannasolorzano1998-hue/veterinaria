/* eslint-disable react/no-unescaped-entities */
import Router from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "../../../controllers/hooks/use_auth";
import HttpClient from "../../../controllers/utils/http_client";
import LoadingContainer from "../../components/loading_container";
import { Venta } from "../../../models";

const GeneralReportVentas = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [ventas, setVentas] = useState<Array<Venta>>([]);
  const [totalValor, setTotalValor] = useState<number>(0);

  const loadData = async () => {
    if (Router.asPath !== Router.route) {
      const dateString = Router.query.dateString as string;

      const response = await HttpClient(
        `/api/ventas?dates=${dateString}`,
        "GET",
        auth.usuario,
        auth.rol
      );
      const ventasData: Array<Venta> = response.data ?? [];

      const total = ventasData.reduce(
        (acc, venta) => acc + venta.valorVenta,
        0
      );

      setVentas(ventasData);
      setTotalValor(total);
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
      <title>Reporte de ventas | "Oh my Dog"</title>

      <LoadingContainer visible={loading}>
        <style>
          {`
              body {
                background-color: white !important;
              }
              @media print {
                .clase-a-ocultar {
                  display: none !important;
                }
              }
           `}
        </style>
        <div className="flex justify-center m-4 gap-4 mb-4 clase-a-ocultar">
          <button
            className="text-center bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white mx-auto my-4 px-4 py-2.5 border border-blue-500 hover:border-transparent rounded"
            onClick={() => window.print()}
          >
            Imprimir
          </button>

          <button
            className="text-center bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white mx-auto my-4 px-4 py-2.5 border border-gray-500 hover:border-transparent rounded"
            onClick={() => Router.back()}
          >
            Volver
          </button>
        </div>
        <div
          style={{
            margin: "1em",
            background: "white",
          }}
        >
          <h4 className="text-center mb-3 font-bold">REPORTE DE VENTAS</h4>

          {ventas.map((venta) => (
            <div key={venta.id} className="mb-6">
              {/* Número de venta */}
              <h5 className="text-lg text-center font-bold mb-2">
                Número de Venta: {venta.number}
              </h5>

              {/* Información del cliente */}
              <div className="mb-4 flex justify-center gap-4">
                <p>
                  <span className="font-bold">Cliente:</span>{" "}
                  {venta.cliente.nombre} {venta.cliente.apellidos}
                </p>
                <p>
                  <span className="font-bold">Cédula:</span>{" "}
                  {venta.cliente.cedula}
                </p>
                <p>
                  <span className="font-bold">Correo:</span>{" "}
                  {venta.cliente.correo}
                </p>
                <p>
                  <span className="font-bold">Teléfono:</span>{" "}
                  {venta.cliente.telefono}
                </p>
              </div>

              {/* Tabla de productos */}
              <table className="table-auto border-collapse border border-gray-400 w-full text-center mb-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Producto
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Cantidad
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Valor Unitario
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {venta.productos.map((producto, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        {producto.producto.nombre}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {producto.cantidad}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ${producto.producto.valor.toFixed(2)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ${producto.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Valor total de la venta */}
              <div className="text-right font-bold mb-2">
                Total Venta: ${venta.valorVenta.toFixed(2)}
              </div>
            </div>
          ))}

          {/* Valor total de todas las ventas */}
          <div className="text-right font-bold text-xl mt-4">
            Total General: ${totalValor.toFixed(2)}
          </div>
        </div>
      </LoadingContainer>
    </>
  );
};

export default GeneralReportVentas;
