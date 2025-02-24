import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import axios from "axios";

const loadTranslations = async (lang: string): Promise<Record<string, string>> => {
  try {
    const response = await axios.get(`https://your-backend.com/api/translations`);
    const data: Array<Record<string, string>> = response.data;

    const translations: Record<string, string> = {};
    data.forEach((item) => {
      const key = item["uz"];
      translations[key] = item[lang] || key;
    });

    return translations;
  } catch (error) {
    console.error("Translation fetch error:", error);
    return {};
  }
};

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: {} },
    en: { translation: {} },
  },
  lng: "uz",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export const changeLanguage = async (lang: string): Promise<void> => {
  const translations = await loadTranslations(lang);

  if (!i18n.hasResourceBundle(lang, "translation")) {
    i18n.addResources(lang, "translation", translations);
  } else {
    i18n.addResourceBundle(lang, "translation", translations, true, true);
  }

  await i18n.changeLanguage(lang);
};

export default i18n;
