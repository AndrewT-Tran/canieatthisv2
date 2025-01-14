import { getRequestConfig, requestLocale } from 'next-intl/server';
import { defaultLocale, locales } from './config';
import messages from '../../messages';

const getMessages = async (locale: string) => {
    return messages[locale] || messages[defaultLocale];
};

export default getRequestConfig(async ({ request }) => {
    const locale = await requestLocale(request);
    return {
        messages: await getMessages(locale),
        timeZone: 'UTC',
        defaultLocale,
        locales
    };
}); 