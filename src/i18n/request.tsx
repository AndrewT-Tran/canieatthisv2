import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from './config';
import messages from '../../messages/index';

const getMessages = async (locale: string) => {
    return messages[locale] || messages[defaultLocale];
};

export default getRequestConfig(async (params: any) => {
    // Extract locale from the request headers or set default
    let locale = params.req.headers['accept-language']?.split(',')[0] || defaultLocale;

    console.log('Determined locale:', locale);

    if (!locales.includes(locale)) {
        console.warn('Invalid locale detected, falling back to default:', defaultLocale);
        locale = defaultLocale;
    }

    return {
        messages: await getMessages(locale),
        timeZone: 'UTC',
        defaultLocale,
        locales,
    };
});