import React from "react";
import UsersPanel from "./layouts/config/users";
import RoleLayout from "./layouts/role_layout";
import Sidebar from "./components/sidebar";
import TabContainer, { TabPanel } from "./components/tab_container";

const Configuration = () => {
  const tabPanels: Array<TabPanel> = [
    {
      name: "Usuarios",
      content: <UsersPanel />,
    },
  ];

  return (
    <RoleLayout permissions={[0]}>
      <title>Configuracion del sistema</title>

      <div className="flex h-full">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 h-screen flex items-center justify-center bg-blue-100">
          <div className="w-11/12 bg-white my-14">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 m-2">
              <TabContainer
                tabPanels={tabPanels}
                style={{ padding: "40px 0" }}
              />
            </div>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};
export default Configuration;
