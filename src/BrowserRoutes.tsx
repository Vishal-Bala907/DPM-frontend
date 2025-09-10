import { BrowserRouter, useRoutes } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import HomePage from "./pages/HomePage";
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/oauth2/redirect",
        element: <OAuth2RedirectHandler />,
      },
      {
        path: "/dashboard",
        element: <div>This is dashboard</div>,
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
