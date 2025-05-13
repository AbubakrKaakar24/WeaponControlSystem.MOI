import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import faTranslation from "./assets/locales/fa/translation.json";
import psTranslation from "./assets/locales/ps/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "fa",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      fa: {
        translation: faTranslation,
      },
      ps: {
        translation: psTranslation,
      },
    },
  });

export default i18n;
