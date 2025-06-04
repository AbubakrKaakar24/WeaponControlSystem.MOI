import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import faTranslation from "./assets/locales/fa/translation.json";
import psTranslation from "./assets/locales/ps/translation.json";
import enTranslation from "./assets/locales/en/translation.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "fa",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Ensures language is saved after switching
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"], // <-- this saves the language
    },
    resources: {
      fa: { translation: faTranslation },
      ps: { translation: psTranslation },
      en: { translation: enTranslation },
    },
  });

export default i18n;
