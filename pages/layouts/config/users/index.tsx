import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingContainer from "../../../components/loading_container";
import { useAuth } from "../../../../controllers/hooks/use_auth";
import { ResponseData, Usuario } from "../../../../models";
import HttpClient from "../../../../controllers/utils/http_client";
import TreeTable, { ColumnData } from "../../../components/tree_table";
import UserModal from "../../../components/modals/user";

const UsersPanel = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Array<Usuario>>([]);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);

  const loadData = async () => {
    setLoading(true);
    const response = await HttpClient(
      "/api/user",
      "GET",
      auth.usuario,
      auth.rol
    );
    if (response.success) {
      const users: Array<any> = response.data;
      setTableData(users);
    } else {
      toast.warning(response.message);
    }
    setLoading(false);
  };

  // ejecuta funcion al renderizar la vista
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = () => setModalVisible(true);
  const hideModal = async () => {
    if (editingUser != null) setEditingUser(null);
    setModalVisible(false);
    await loadData();
  };

  const columns: ColumnData[] = [
    {
      dataField: "nombre",
      caption: "Nombre",
    },
    {
      dataField: "usuario",
      caption: "Usuario",
    },
    {
      dataField: "correo",
      caption: "E-mail",
    },
    {
      dataField: "identificacion",
      caption: "Cedula o RUC",
    },
    {
      dataField: "rol",
      caption: "Rol",
      cellRender: ({ text }: any) => {
        switch (text) {
          case "0":
            return "AdministradorSistema";
          case "1":
            return "Curador";
          case "2":
            return "Empacador";
          case "3":
            return "Administrador";
          case "4":
            return "Bodeguero";
          default:
            return "";
        }
      },
    },
  ];

  const buttons = {
    edit: (rowData: any) => {
      setEditingUser(rowData);
      showModal();
    },
    delete: async (rowData: any) => {
      await HttpClient(
        "/api/user/" + rowData.id,
        "DELETE",
        auth.usuario,
        auth.rol
      );
      toast.success("Usuario eliminado");
      await loadData();
    },
  };

  return (
    <div style={{ padding: "40px 0" }}>
      <button
        className="text-center bg-transparent hover:bg-blue-600 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={showModal}
      >
        Crear Usuario
      </button>
      <LoadingContainer visible={loading} miniVersion>
        <TreeTable
          dataSource={tableData}
          columns={columns}
          buttons={buttons}
          searchPanel={true}
          colors={{ headerBackground: "#F8F9F9", headerColor: "#466cf2" }}
          paging
          showNavigationButtons
          showNavigationInfo
          pageSize={10}
          infoText={(actual, total, items) =>
            `Página ${actual} de ${total} (${items} Usuarios)`
          }
        />
      </LoadingContainer>
      <UserModal
        visible={modalVisible}
        close={hideModal}
        initialData={editingUser}
        onDone={async (newUser: Usuario) => {
          console.log(newUser);
          const response: ResponseData =
            editingUser == null
              ? await HttpClient(
                  "/api/user",
                  "POST",
                  auth.usuario,
                  auth.rol,
                  newUser
                )
              : await HttpClient(
                  "/api/user",
                  "PUT",
                  auth.usuario,
                  auth.rol,
                  newUser
                );
          if (response.success) {
            toast.success(
              editingUser == null ? "Usuario creado!" : "Usuario actualizado!"
            );
          } else {
            toast.warning(response.message);
          }
        }}
      />
    </div>
  );
};

export default UsersPanel;
