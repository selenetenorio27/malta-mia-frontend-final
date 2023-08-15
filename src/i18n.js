import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './assets/translations/en.json';
import esTranslation from './assets/translations/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      es: {
        translation: esTranslation,
      }
    },
    lng: 'es', // Idioma predeterminado
    fallbackLng: 'es', // Idioma de respaldo si el idioma seleccionado no tiene traducciones disponibles
    interpolation: {
      escapeValue: false // Permitir el uso de HTML en las traducciones
    }
  });

export default i18n;






