import { RouteObject } from "react-router-dom";
import Home from "../pages/HomePage";
import ApplicationPage from "../pages/ApplicationPage";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/form/:step", element: <ApplicationPage /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
