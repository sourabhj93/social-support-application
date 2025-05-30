import { useEffect, useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NavHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <CloseOutlined size={24} />
            ) : (
              <MenuOutlined size={24} />
            )}
          </button>
          <h1 className="text-xl font-bold text-gray-800">{t("title")}</h1>
          <div className="w-40 md:hidden">
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
        </div>

        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            {t("home")}
          </Link>
          <Link
            to="/form/personalInfo"
            className="text-gray-700 hover:text-blue-600"
          >
            {t("startApplication")}
          </Link>
          <div className="w-40">
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
        </nav>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 px-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            {t("home")}
          </Link>
          <Link
            to="/form/personalInfo"
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            {t("startApplication")}
          </Link>
        </div>
      )}
    </header>
  );
}
