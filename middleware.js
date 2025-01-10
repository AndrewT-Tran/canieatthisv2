import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './app/i18n/settings';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
});

// Match all pathnames except for
// - /api (API routes)
// - /_next (Next.js internals)
// - /static (inside /public)
// - /_vercel (Vercel internals)
// - all root files inside /public (e.g. /favicon.ico)
export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 