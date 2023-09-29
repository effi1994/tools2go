import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import translations from './localizations';




let i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.fallbacks = true;

export default i18n;


