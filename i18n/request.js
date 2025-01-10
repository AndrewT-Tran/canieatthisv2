import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';
import en from '../messages/en.json';
import es from '../messages/es.json';
import zh from '../messages/zh.json';

const messages = {
    en,
    es,
    zh
};

export default getRequestConfig(async ({ locale }) => ({
    messages: messages[locale] || messages[defaultLocale],
    timeZone: 'UTC'
}));

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales }); 