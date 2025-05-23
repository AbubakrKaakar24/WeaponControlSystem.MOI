import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./i18n";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <Login /> */}
  </StrictMode>
);
