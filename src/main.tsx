import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BrowserRoutes from "./BrowserRoutes.tsx";
// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <BrowserRoutes />
  </StrictMode>
);
