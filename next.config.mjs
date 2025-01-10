import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['edamam.com', 'www.edamam.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.edamam.com',
            },
        ],
    }
};

export default withNextIntl(nextConfig);
