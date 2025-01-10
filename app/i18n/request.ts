import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
    const headersList = await headers();
    const locale = (await headersList.get('X-Next-Intl-Locale')) || 'en';
    const messages = (await import(`../../messages/${locale}.json`)).default;

    return {
        messages,
        locale,
        timeZone: 'UTC'
    };
}); 