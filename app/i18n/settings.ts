export const locales = ['en', 'es', 'cn', 'vi'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];
export type LocaleString = string & {};
