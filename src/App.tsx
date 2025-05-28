import { FormProvider } from "./context/FormContext";
import FormWizard from "./components/FormWizard";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <FormProvider>
      <div className="min-h-screen text-gray-900 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="w-40 my-2">
            <select
              value={i18n.language}
              aria-label="Select Language"
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">{t("title")}</h1>
          <FormWizard />
        </div>
      </div>
    </FormProvider>
  );
}
