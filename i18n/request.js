import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { locales, defaultLocale } from './config';
import en from '../messages/en.json';
import es from '../messages/es.json';
import zh from '../messages/zh.json';

const messages = {
    en,
    es,
    zh
};

export default getRequestConfig(async () => {
    const headersList = headers();
    const locale = headersList.get('X-NEXT-INTL-LOCALE') || defaultLocale;

    return {
        locale,
        messages: messages[locale] || messages[defaultLocale],
        timeZone: 'UTC',
        now: new Date()
    };
});

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales }); 