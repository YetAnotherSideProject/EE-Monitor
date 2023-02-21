// React
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Components
import App from "./App";
import Pv, { pvLoader } from "./routes/Pv";
import Wind from "./routes/Wind";
import Biomass from "./routes/Biomass";
import Water from "./routes/Water";

const baseUrl = import.meta.env.BASE_URL as string;
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <Pv />, loader: pvLoader },
        { path: "wind", element: <Wind /> },
        { path: "biomass", element: <Biomass /> },
        { path: "water", element: <Water /> },
      ],
    },
  ],
  {
    basename: baseUrl,
  }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
