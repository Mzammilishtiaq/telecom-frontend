import { Route, Routes } from "react-router-dom";
import Home from "./Screen/client/Home/Home";
import Contributor from "./Screen/client/contributor/contributor";
import HomeContainer from "./Container/HomeContainer";
import AdminContainer from "./Container/AdminContainer";
import DashboardPage from "./Screen/admin/Dashboard";
import SubmissionPage from "./Screen/admin/submission";
import DatabaseManagmentPage from "./Screen/admin/DatabaseMangement";
import SettingsPage from "./Screen/admin/setting";
import AnalyticsPage from "./Screen/admin/analytics";
import Login from "./Screen/auth/Login";
import Signup from "./Screen/auth/Signup";
import ProtectedRoute from "./component/ProtectedRoute";
import GoogleAuthCallback from "./Screen/auth/GoogleAuthCallback"; // Import the new component
import ForgotPassword from "./Screen/auth/ForgotPassword";
import ResetPassword from "./Screen/auth/ResetPassword";
import NewPasswordPage from "./Screen/auth/NewPassword";
import Feature from "./Screen/client/Feature/Feature";
import PricingPage from "./Screen/client/Pricing/Pricing";
import DocsPage from "./Screen/client/docs/docs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <ProtectedRoute
            allowedRoles={["admin"]}
            component={<AdminContainer />}
          />
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="submissions" element={<SubmissionPage />} />
        <Route path="database" element={<DatabaseManagmentPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>

      <Route
        path="/"
        element={
          <ProtectedRoute
            allowedRoles={["FREE_USER"]}
            component={<HomeContainer />}
          />
        }
      >
        <Route path="" element={<Home />} />
        <Route path="contributor" element={<Contributor />} />
        <Route path="features" element={<Feature />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="docs" element={<DocsPage />} />
      </Route>
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/newpassword/:token" element={<NewPasswordPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/newpassword" element={<NewPasswordPage />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/admin/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/signup" element={<Signup />} />
      <Route path="/auth/google/success" element={<GoogleAuthCallback />} />
      <Route
        path="*"
        element={
          <h1 className="text-2xl font-semibold text-center my-10">
            404 NOT FOUND
          </h1>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
