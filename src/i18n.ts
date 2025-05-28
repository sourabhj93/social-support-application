import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) 
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n instance to react-i18next
  .init({
    fallbackLng: "en",
    debug: true, 

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // where translation files are
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
