/**
 * The site's languages. Adding one means adding it here, a UI dictionary in
 * `src/i18n/<code>.json` and a catalogue in `src/content/catalog/<code>.json`.
 * The default language is served at the root; every other one under `/<code>/`.
 */
export const languages = {
  en: { name: 'English', dir: 'ltr', ogLocale: 'en_US', numbers: 'en-US' },
  fa: { name: 'فارسی', dir: 'rtl', ogLocale: 'fa_IR', numbers: 'fa-IR' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
