import { getRequestConfig, setRequestLocale } from 'next-intl/server';
import { defaultLocale, locales } from './config';
import messages from '../../messages/index';

const getMessages = async (locale: string) => {
    return messages[locale] ?? messages[defaultLocale];
};

export default getRequestConfig(async (params: any) => {
    // Check if the request object is available
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

    // Fallback to default locale
    console.warn('Request object is missing or invalid, using default locale.');
    return {
        messages: await getMessages(defaultLocale),
        timeZone: 'UTC',
        defaultLocale,
        locales,
    };
});