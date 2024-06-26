import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import transAR from "./static/locales/ar.json";
import transEN from "./static/locales/en.json";
import transES from "./static/locales/es.json";
import transFR from "./static/locales/fr.json";

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    resources: {
      en: { translation: transEN },
      fr: { translation: transFR },
      es: { translation: transES },
      ar: { translation: transAR },
    },
  });

export default i18n;
