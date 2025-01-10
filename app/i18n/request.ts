import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
    return {
        messages: (await import(`../../messages/${process.env.NEXT_LOCALE}.json`)).default,
        timeZone: 'UTC'
    };
}); 