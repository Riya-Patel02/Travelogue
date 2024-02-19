import LocalizedStrings from 'react-native-localization';
import fr from '../localization/locales/fr.json';
import en from '../localization/locales/en.json';
import gu from '../localization/locales/gu.json';
const resources = {en,fr,gu};
let strings = new LocalizedStrings(resources);



// i18n.use(initReactI18next).init({
//   lng: en,
//   fallbackLng: en,
//   debug: true,
//   interpolation: {
//     escapeValue: false,
//   },
//   compatibilityJSON: 'v3',
//   resources
// });

// export {i18n as strings};

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr', // Default language
  fallbackLng: 'fr', // Fallback language
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

export {strings, i18n};
