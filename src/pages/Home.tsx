import { Link, Outlet, useNavigate } from "react-router-dom";
import FormWizard from "../components/FormWizard";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider } from "../context/ApplicationFormContext";
import NavHeader from "../components/NavHeader";

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div>
      <button
        onClick={() => navigate("/start-application")}
        className="btn text-blue-600 mt-6"
      >
        {t("startApplication")}
      </button>
    </div>
  );
}
