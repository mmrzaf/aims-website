import en from '../i18n/en.json';
import fa from '../i18n/fa.json';
import { languages, type Lang } from '../config/languages';

export const locales = Object.keys(languages) as Lang[];

const dictionaries = { en, fa } as const;

export const dirOf = (lang: Lang) => languages[lang].dir;

export function t(lang: Lang, key: string): string {
  let value: unknown = dictionaries[lang];
  for (const part of key.split('.')) {
    if (!value || typeof value !== 'object' || !(part in value)) {
      throw new Error(`Missing UI translation: ${lang}.${key}`);
    }
    value = (value as Record<string, unknown>)[part];
  }
  if (typeof value !== 'string') throw new Error(`UI translation is not a string: ${lang}.${key}`);
  return value;
}

export function number(lang: Lang, value: number): string {
  return new Intl.NumberFormat(languages[lang].numbers).format(value);
}
