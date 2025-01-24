export const locales = ['en', 'es', 'cn', 'vi'];
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];
export type LocaleString = string & {};
