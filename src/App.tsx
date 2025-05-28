import { FormProvider } from "./context/ApplicationFormContext";
import FormWizard from "./components/FormWizard";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
