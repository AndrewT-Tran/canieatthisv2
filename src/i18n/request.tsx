import { getRequestConfig, setRequestLocale } from 'next-intl/server';
import { defaultLocale, locales } from './config';
import messages from '../../messages/index';

const getMessages = async (locale: string) => {
    return messages[locale] || messages[defaultLocale];
};

export default getRequestConfig(async (params: any) => {
    let locale = await setRequestLocale(params.req);
    console.log('Determined locale:', locale);
    if (typeof locale !== 'string' || !locales.includes(locale)) {
        console.warn('Invalid locale detected, falling back to default:', defaultLocale);
        locale = defaultLocale;
    }
    if (locale === undefined) {
        locale = defaultLocale;
    }
    return {
        messages: await getMessages(locale),
        timeZone: 'UTC',
        defaultLocale,
        locales
    };
}); 