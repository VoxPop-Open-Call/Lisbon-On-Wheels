import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import nl from './locales/nl.json';
import en from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'nl',
    interpolation: {
      escapeValue: false
    },
    lng: 'nl',
    debug: true,
    resources: {
      nl: {
        translation: nl
      },
      en: {
        translation: en
      }
    }
  });

// for development purposes the language can be changed here, it will otherwise pick up the browser language
i18n.changeLanguage('en');
