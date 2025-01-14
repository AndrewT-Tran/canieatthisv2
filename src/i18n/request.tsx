import { getRequestConfig, setRequestLocale } from 'next-intl/server';
import { defaultLocale, locales } from './config';
import messages from '../../messages/index';

const getMessages = async (locale: string) => {
    return messages[locale] || messages[defaultLocale];
};

export default getRequestConfig(async (params: any) => {
    // Determine the locale from params or headers
    let locale = params.req.headers['accept-language']?.split(',')[0];

    // Validate the locale
    if (!locale || !locales.includes(locale)) {
        console.warn('Invalid locale detected, falling back to default:', defaultLocale);
        locale = defaultLocale;
    }

    // Set the request locale
    setRequestLocale(locale);

    return {
        locale, // Ensure to return the locale
        messages: await getMessages(locale),
        timeZone: 'UTC',
        defaultLocale,
        locales
    };
});