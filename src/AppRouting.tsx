import { Route, Routes } from 'react-router-dom';
import Home from './Screen/client/Home/Home';
import Contributor from './Screen/client/contributor/contributor';
import HomeContainer from './Container/HomeContainer';
import AdminContainer from './Container/AdminContainer';
import DashboardPage from './Screen/admin/Dashboard';
import SubmissionPage from './Screen/admin/submission';
import DatabaseManagmentPage from './Screen/admin/DatabaseMangement';
import SettingsPage from './Screen/admin/setting';
import AnalyticsPage from './Screen/admin/analytics';
import Login from './Screen/auth/Login'
import Signup from './Screen/auth/Signup'
import AuthGuide from './service/authGuide'
import GoogleAuthCallback from './Screen/auth/GoogleAuthCallback'; // Import the new component

const Routers = [
  {
    path: '/signin',
    component: <Login />,
    protectedPath:false
  },
  {
    path:'/signup',
    component:<Signup />,
    protectedPath:false
  },
  {
    path: '/admin/signin',
    component: <Login />,
    protectedPath:false
  }, {
    path:`/admin/signup`,
    component:<Signup />,
    protectedPath:false
  },
  {
    path: '/',
    component: <HomeContainer />,
    protectedPath:false,
    children: [
      {
        path: '',
        component: <Home />,
        protectedPath: false,
        role: 'client',
      },
      {
        path: '/contributor',
        component: <Contributor />,
        protectedPath: false,
        role: 'client',
      }
    ]
  }, {
    path: '/admin',
    component: <AdminContainer />,
    protectedPath:true,
    children: [
      {
        path: 'dashboard',
        component: <DashboardPage/>,
        protectedPath: true,
        role: 'admin',
      },
       {
        path: 'submissions',
        component: <SubmissionPage/>,
        protectedPath: true,
        role: 'admin',
      },
      {
        path: 'database',
        component: <DatabaseManagmentPage/>,
        protectedPath: true,
        role: 'admin',
      },
      {
        path: 'analytics',
        component: <AnalyticsPage/>,
        protectedPath: true,
        role: 'admin',
      },
      {
        path: 'settings',
        component: <SettingsPage/>,
        protectedPath: true,
        role: 'admin',
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
              children && children.map(({ path, component,role,protectedPath }) => (
                <Route path={path} element={<AuthGuide protectedPath={protectedPath} role={role}>{component}</AuthGuide>} />
              ))
            }
          </Route>
        ))}
      {/* Add the new route for Google OAuth callback */}
      <Route path="/auth/google/success" element={<GoogleAuthCallback />} />
      <Route path="*" element={<h1 className='text-2xl font-semibold text-center my-10'>404 NOT FOUND</h1>} />
    </Routes>
  )
}
export default AppRouting
