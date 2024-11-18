import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { SupabaseProvider } from "./SupabaseContext";

// Componentes
import Login from "./Login";
import Register from "./Register";
import Index from "./Index";
import Config from "./Config";
import AboutSape from "./AboutSape";
import ApiSis from "./ApiSis";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/index",
    element: <Index />,
  },
  {
    path: "/config",
    element: <Config />,
  },
  {
    path: "/apiSis",
    element: <ApiSis />,
  },
  {
    path: "/aboutSape",
    element: <AboutSape />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SupabaseProvider>
      <RouterProvider router={router} />
    </SupabaseProvider>
  </React.StrictMode>
);
