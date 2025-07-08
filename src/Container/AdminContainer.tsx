import { Outlet } from "react-router-dom";
import { AdminSidebar as Sidebar } from "../Screen/admin/Sidebar";
function AdminContainer() {
  return (
    <div>
        {<Sidebar>
          <div>
            <Outlet />
          </div>
        </Sidebar>}
    </div>
  );
}

export default AdminContainer;
