import { RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Layout from "./Layout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "start-application", element: <LandingPage /> },
    ],
  },
];
