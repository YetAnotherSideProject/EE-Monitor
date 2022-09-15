// React
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Chakra UI Styling
import { ChakraProvider } from "@chakra-ui/react";
//Components
import App from "./App";
import PagePv from "./components/PagePv";
import PageWind from "./components/PageWind";
import PageBiomass from "./components/PageBiomass";
import PageWater from "./components/PageWater";

const baseUrl = import.meta.env.BASE_URL as string;
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <PagePv /> },
        { path: "wind", element: <PageWind /> },
        { path: "biomass", element: <PageBiomass /> },
        { path: "water", element: <PageWater /> },
      ],
    },
  ],
  {
    basename: baseUrl,
  }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
