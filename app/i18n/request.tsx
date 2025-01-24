import { setRequestLocale } from 'next-intl/server';
import { defaultLocale, locales } from './config';
import messages from '../../messages/index';
import { NextRequest } from 'next/server';


const getMessages = async (locale: string) => {
  return messages[locale] ?? messages[defaultLocale];
};

export function getRequestConfig(req: NextRequest) {
  const acceptLanguage = req.headers.get('accept-language');
  const urlLocale = req.nextUrl?.locale;
  const locale = urlLocale && locales.includes(urlLocale) ? urlLocale : acceptLanguage?.split(',')[0] || defaultLocale;
  return { locale };
}

export default async function handleRequest(params: any) {
  if (params.req) {
    await setRequestLocale(params.req);
    const locale = params.req.headers['accept-language']?.split(',')[0];

    if (locale && locales.includes(locale)) {
      return {
        messages: await getMessages(locale),
        timeZone: 'UTC',
        defaultLocale,
        locales,
      };
    }
  }

  console.warn('Request object is missing or invalid, using default locale.');
  return {
    messages: await getMessages(defaultLocale),
    timeZone: 'UTC',
    defaultLocale,
    locales,
  };
}
