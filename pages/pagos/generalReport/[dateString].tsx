/* eslint-disable react/no-unescaped-entities */
import Router from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "../../../controllers/hooks/use_auth";
import HttpClient from "../../../controllers/utils/http_client";
import LoadingContainer from "../../components/loading_container";
import { Factura, Pago } from "../../../models";

const GeneralReportPagos = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [pagos, setPagos] = useState<Array<Pago>>([]);
  const [totalValor, setTotalValor] = useState<number>(0);

  const loadData = async () => {
    if (Router.asPath !== Router.route) {
      const dateString = Router.query.dateString as string;

      // Obtener pagos
      const response = await HttpClient(
        `/api/pagos?dates=${dateString}`,
        "GET",
        auth.usuario,
        auth.rol
      );
      const pagosData: Array<Pago> = response.data ?? [];

      // Calcular el total de valor de facturas
      const total = pagosData.reduce((acc, pago) => acc + pago.valorTotal, 0);
      console.log(pagosData)
      setPagos(pagosData);
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
      <title>Reporte de pagos | "Oh my Dog"</title>

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
          <h4 className="text-center mb-3 font-bold">REPORTE DE PAGOS</h4>

          <table className="table-auto border-collapse border border-gray-400 w-full text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Número de Factura
                </th>
                <th className="border border-gray-300 px-4 py-2">Proveedor</th>
                <th className="border border-gray-300 px-4 py-2">RUC</th>
                <th className="border border-gray-300 px-4 py-2">Fecha</th>
                <th className="border border-gray-300 px-4 py-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((pago) =>
                pago.facturas.map((factura, index) => (
                  <tr key={`${pago.id}-${index}`}>
                    <td className="border border-gray-300 px-4 py-2">
                      {factura.numeroFactura}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {factura.nombreProveedor}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {factura.ruc}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {factura.fechaFactura}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${factura.valorFactura.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={4}
                  className="border border-gray-300 px-4 py-2 font-bold text-right"
                >
                  Total
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  ${totalValor.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </LoadingContainer>
    </>
  );
};
export default GeneralReportPagos;
