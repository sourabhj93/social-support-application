import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";

export default function App() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
