/* eslint-disable react/no-unescaped-entities */
import { Button } from "react-bootstrap";
import Sidebar from "../components/sidebar";
import { CheckPermissions } from "../../controllers/utils/check_permissions";
import Router from "next/router";
import { toast } from "react-toastify";
import { useAuth } from "../../controllers/hooks/use_auth";
import { useEffect, useState } from "react";
import HttpClient from "../../controllers/utils/http_client";
import { Cita } from "../../models";
import TreeTable, { ColumnData } from "../components/tree_table";

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
  const [tableData, setTableData] = useState<Array<Cita>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);

    // Obtener todas las citas desde el backend
    const response = await HttpClient(
      "/api/cita",
      "GET",
      auth.usuario,
      auth.rol
    );
    const citas: Array<Cita> = response.data ?? [];

    // Filtrar citas según el rol del usuario
    let filteredCitas = citas;

    if (auth.rol === 3 && auth.medico) {
      // Si el usuario es un médico, filtrar las citas por la especialidad de ese médico
      filteredCitas = citas.filter(
        (cita) => cita.especialidad.nombre === auth.medico.especialidad.nombre
      );
    }

    console.log(citas)

    setTableData(filteredCitas);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnData[] = [
    {
      dataField: "number",
      caption: "#",
      alignment: "center",
      cssClass: "bold",
    },
    {
      dataField: "fecha",
      caption: "Fecha",
      alignment: "center",
      cssClass: "bold",
    },
    {
      dataField: "cliente.nombre",
      caption: "Nombre cliente",
      cssClass: "bold",
    },
    {
      dataField: "cliente.apellidos",
      caption: "Apellido cliente",
      cssClass: "bold",
    },
    {
      dataField: "mascota.nombre",
      caption: "Mascota",
      cssClass: "bold",
    },
    {
      dataField: "especialidad.nombre",
      caption: "Especialidad",
      cssClass: "bold",
    },
    {
      dataField: "medico.nombres",
      caption: "Medico",
      cssClass: "bold",
    },
  ];

  const buttons = {
    edit: (rowData: Cita) =>
      CheckPermissions(auth, [0, 3])
        ? Router.push({
            pathname: "/medical-appointment/edit/" + (rowData.id as string),
          })
        : toast.error("No puedes acceder"),
    edit2: (rowData: Cita) =>
      CheckPermissions(auth, [0, 3])
        ? Router.push({
            pathname: "/medical-appointment/medical/" + (rowData.id as string),
          })
        : toast.error("No puedes acceder"),
    //delete: async (rowData: Cajas) => {
    //  CheckPermissions(auth, [0])
    //    ? showConfirmModal(rowData.id)
    //    : toast.error("No puedes eliminar una Solicitud");
    //},
    //download: (rowData: Cajas) =>
    //  !CheckPermissions(auth, [0])
    //    ? Router.push({
    //        pathname: "/solicitude/print/" + (rowData.id as string),
    //      })
    //    : toast.error("No puedes acceder"),
  };
  return (
    <>
      <title>Citas | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-5/6 mx-auto">
            <div className="mt-6">
              <p className="md:text-4xl text-xl text-center pt-5 font-extrabold text-blue-500">
                Gestión de citas médicas
              </p>
            </div>

            <Button
              className="text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center mx-2 mb-2 mt-3 dark:focus:ring-blue-900"
              onClick={() =>
                CheckPermissions(auth, [0, 1, 3])
                  ? Router.push({ pathname: "/medical-appointment/create" })
                  : toast.info("No puede ingresar solicitudes")
              }
            >
              Crear cita
            </Button>
            <div className="p-2">
              <TreeTable
                keyExpr="id"
                dataSource={tableData}
                columns={columns}
                searchPanel={true}
                buttons={buttons}
                colors={{ headerBackground: "#F8F9F9", headerColor: "#466cf2" }}
                buttonsFirst
                paging
                showNavigationButtons
                showNavigationInfo
                pageSize={10}
                infoText={(actual, total, items) =>
                  `Página ${actual} de ${total} (${items} solicitudes)`
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CitasPages;
