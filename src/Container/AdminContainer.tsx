import { Outlet } from 'react-router-dom';
import {AdminSidebar as Sidebar} from '../component/Admin/Sidebar';

function AdminContainer() {
    return (
       <div>
        <Sidebar>
        <div>
            <Outlet/>
        </div>
        </Sidebar>
        </div>
    )
}

export default AdminContainer
