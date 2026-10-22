import Router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { ModalProps } from "../../../models";
import theme from "../../../controllers/styles/theme";

const ReportPagos = (props: ModalProps<any>) => {
  const [dates, setDates] = useState<Array<string>>([]);
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          props.visible ? "" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded shadow-lg z-10 md:w-1/5 w-4/5 md:h-88 overflow-y-auto">
          <div
            style={{ color: theme.colors.blue }}
            className="text-center text-xl mb-2 font-semibold"
          >
            Reporte General
          </div>

          <label htmlFor="date-one">Fecha inicio</label>
          <input
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="date-one"
            type="date"
            placeholder="Fecha inicio"
            value={dates[0]}
            onChange={(e) =>
              setDates((oldValues) => [e.target.value, oldValues[1]])
            }
          />
          <label htmlFor="date-two">Fecha final</label>
          <input
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="date-two"
            type="date"
            placeholder="Fecha final"
            value={dates[1]}
            onChange={(e) =>
              setDates((oldValues) => [oldValues[0], e.target.value])
            }
          />
          <div>
            <button
              className="text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center mx-2 mb-2 mt-3 dark:focus:ring-blue-900"
              onClick={() => {
                if (
                  dates[0] === undefined ||
                  dates[0] === "" ||
                  dates[1] === undefined ||
                  dates[1] === ""
                ) {
                  toast.warning("Debe marcar un rango de fechas");
                } else {
                  Router.push({
                    pathname:
                      "/pagos/generalReport/" + dates[0] + "¡" + dates[1],
                  });
                }
              }}
            >
              Reporte General
            </button>
          </div>
          <div>
            <button
              className="text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-3 text-center mx-2 mb-2 mt-3 dark:focus:ring-gray-900"
              onClick={props.close}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReportPagos;
