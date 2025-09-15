import { BrowserRouter, useRoutes } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import HomePage from "./pages/HomePage";
import DetailedPricing from "./pages/DetailedPricing";
import AddWork from "./pages/AddWork";
import ViewWorkData from "./pages/ViewWorkData";
import CategoryDataPage from "./pages/CategoryDataPage";
import ViewDateDataPage from "./pages/ViewDateDataPage";
import DashboardLayout from "./components/DashboardLayout";
import ViewOrganizationData from "./pages/ViewOrganizationData";
import ViewEmployeeData from "./pages/ViewEmployeeData";
import ViewEmployeeDateData from "./pages/ViewEmployeeDateData";
import UserProfile from "./pages/UserProfile";
const BrowserRoutes = () => {
  const RouteConfig = () => {
    const ROUTES = useRoutes([
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/pricing",
        element: <DetailedPricing />,
      },
      {
        path: "/add-work",
        element: <AddWork />,
      },
      {
        path: "/view-work-data",
        element: <ViewWorkData />,
      },
      {
        path: "/category-data",
        element: <CategoryDataPage />,
      },
      {
        path: "/view-date-data",
        element: <ViewDateDataPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/oauth2/redirect",
        element: <OAuth2RedirectHandler />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <ViewOrganizationData />,
          },
          {
            path: "/dashboard/view-org-data",
            element: <ViewOrganizationData />,
          },
          {
            path: "/dashboard/view-emp-data",
            element: <ViewEmployeeData />,
          },
          {
            path: "/dashboard/view-emp-data-datewise",
            element: <ViewEmployeeDateData />,
          },
          {
            path: "/dashboard/view-emp-date-data",
            element: <ViewEmployeeDateData />,
          },
        ],
      },
    ]);

    return ROUTES;
  };

  return (
    <div>
      <BrowserRouter>
        {/* <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="/dashboard" element={<div>This is dashboard</div>} />
        </Routes> */}
        <RouteConfig />
      </BrowserRouter>
    </div>
  );
};

export default BrowserRoutes;
