/* eslint-disable react/no-unescaped-entities */
import { Button } from "react-bootstrap";
import Sidebar from "../components/sidebar";
import { CheckPermissions } from "../../controllers/utils/check_permissions";
import Router from "next/router";
import { toast } from "react-toastify";
import { useAuth } from "../../controllers/hooks/use_auth";
import { useEffect, useState } from "react";
import HttpClient from "../../controllers/utils/http_client";
import { Mascota } from "../../models";
import TreeTable, { ColumnData } from "../components/tree_table";
import ConfirmModal from "../components/modals/confirm";

type Props = {
  dates: Array<string>;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  inTabs?: boolean;
};

export const MascotasPage = (props: Props) => {
  const { auth } = useAuth();
  const [tableData, setTableData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [itemToDelete, setItemToDelete] = useState<{ clienteId: string; mascotaId: string }>(null);

  const loadData = async () => {
    setLoading(true);

    const response = await HttpClient(
      "/api/client",
      "GET",
      auth.usuario,
      auth.rol
    );

    const clientes = response.data ?? [];

    // Filtrar todas las mascotas de los clientes
    const mascotas = clientes.flatMap((cliente, clienteIndex) =>
      (cliente.mascotas || []).map((mascota, mascotaIndex) => ({
        ...mascota,
        id: mascota.id || mascota._id || `temp-${clienteIndex}-${mascotaIndex}`, // Asegurar que tenga id
        clienteId: cliente.id, // Agregamos el ID del cliente
        clienteNombre: `${cliente.nombre} ${cliente.apellidos}`, // Agregamos información del cliente
      }))
    );

    console.log(mascotas)
    setTableData(mascotas);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnData[] = [
    {
      dataField: "nombre",
      caption: "Nombre",
      alignment: "center",
      cssClass: "bold",
    },
    {
      dataField: "tipo",
      caption: "Tipo",
      cssClass: "bold",
    },
    {
      dataField: "raza",
      caption: "Raza",
      cssClass: "bold",
    },
    {
      dataField: "fechaNacimiento",
      caption: "Fecha de Nacimiento",
      alignment: "center",
    },
    {
      dataField: "clienteNombre",
      caption: "Propietario",
      cssClass: "bold",
    },
  ];

  const showConfirmModal = (clienteId: string, mascotaId: string) => 
    setItemToDelete({ clienteId, mascotaId });
  const hideConfirmModal = () => setItemToDelete(null);

  const buttons = {
    edit: (rowData: any) =>
      CheckPermissions(auth, [0])
        ? Router.push(`/mascotas/editar/${rowData.id}`)
        : toast.error("No puedes acceder"),
    delete: async (rowData: any) => {
      CheckPermissions(auth, [0])
        ? showConfirmModal(rowData.clienteId, rowData.id)
        : toast.error("No puedes eliminar una mascota");
    },
    //download: (rowData: Cajas) =>
    //  !CheckPermissions(auth, [0])
    //    ? Router.push({
    //        pathname: "/solicitude/print/" + (rowData.id as string),
    //      })
    //    : toast.error("No puedes acceder"),
  };
  return (
    <>
      <title>Mascotas | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-5/6 mx-auto">
            <div className="mt-6">
              <p className="md:text-4xl text-xl text-center pt-5 font-extrabold text-blue-500">
                Mascotas
              </p>
            </div>

            <Button
              className="text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center mx-2 mb-2 mt-3 dark:focus:ring-blue-900"
              onClick={() =>
                CheckPermissions(auth, [0, 1])
                  ? Router.push({ pathname: "/mascotas/create" })
                  : toast.info("No puede ingresar mascotas")
              }
            >
              Crear mascota
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
      <ConfirmModal
        visible={itemToDelete !== null}
        close={() => setItemToDelete(null)}
        onDone={async () => {
          const response = await HttpClient(
            `/api/client/mascota?clienteId=${itemToDelete.clienteId}&mascotaId=${itemToDelete.mascotaId}`,
            "DELETE",
            auth.usuario,
            auth.rol
          );
          hideConfirmModal();
          if (response.success) {
            toast.success("Mascota eliminada correctamente");
          } else {
            toast.error("Error al eliminar mascota");
          }
          await loadData();
        }}
      />
    </>
  );
};

export default MascotasPage;
