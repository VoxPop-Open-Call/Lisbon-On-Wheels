import nl from './locales/nl.json';
import en from './locales/en.json';

import 'react-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      nl: typeof nl;
      en: typeof en;
    };
  }
}
