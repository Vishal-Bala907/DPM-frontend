import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
const BrowserRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="/dashboard" element={<div>This is dashboard</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default BrowserRoutes;
