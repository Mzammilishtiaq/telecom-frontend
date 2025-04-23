import { Route, Routes } from 'react-router-dom';
import Home from './Screen/Home/Home';
import Contributor from './Screen/contributor/contributor';
import HomeContainer from './Container/HomeContainer';
import AdminContainer from './Container/AdminContainer';
import DashboardPage from './component/Admin/Dashboard';
import SubmissionPage from './component/Admin/submission';
import DatabaseManagmentPage from './component/Admin/DatabaseMangement';
import SettingsPage from './component/Admin/setting';
import AnalyticsPage from './component/Admin/analytics';

const Routers = [
  {
    path: '/',
    component: <HomeContainer />,
    children: [
      {
        path: '',
        component: <Home />,

      },
      {
        path: '/contributor',
        component: <Contributor />,

      }
    ]
  }, {
    path: '/admin',
    component: <AdminContainer />,
    children: [
      {
        path: 'dashboard',
        component: <DashboardPage/>
      },
       {
        path: 'submissions',
        component: <SubmissionPage/>
      },
      {
        path: 'database',
        component: <DatabaseManagmentPage/>
      },
      {
        path: 'analytics',
        component: <AnalyticsPage/>
      },
      {
        path: 'settings',
        component: <SettingsPage/>
      }
    ]
  }
]

function AppRouting() {

  return (
    <Routes>
      {
        Routers.map(({ path, component, children }) => (
          <Route path={path} element={component} key={Math.random()}>
            {
              children && children.map(({ path, component }) => (
                <Route path={path} element={component} />
              ))
            }
          </Route>
        ))}
      <Route path="*" element={<h1 className='text-2xl font-semibold text-center my-10'>404 NOT FOUND</h1>} />
    </Routes>
  )
}
export default AppRouting