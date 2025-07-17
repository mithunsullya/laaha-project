import createIntlMiddleware from 'next-intl/middleware';
import { locales } from '@/navigation';
import { NextResponse } from 'next/server';
import { decrypt } from '@/src/lib/session';
import { deployCountries } from '@/site.config';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localeDetection: false
});

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const acceptLanguage = request.headers.get('accept-language') || 'en';
  const countryCode = request.headers.get('CF-IPCountry') || 'IN';
  const deployedCountryCodes = Object.keys(deployCountries);

  const preferredLocales = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0].trim())
    .filter((lang) => locales.includes(lang));

  let localeValue;

  if (deployedCountryCodes.includes(countryCode)) {
    const defaultLanCode = deployCountries[countryCode];
    localeValue = preferredLocales.includes(defaultLanCode)
      ? preferredLocales[0]
      : defaultLanCode;
  } else {
    localeValue = preferredLocales.length > 0 ? preferredLocales[0] : 'en';
  }

  // Root path → redirect to locale home
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${localeValue}/home`;
    return NextResponse.redirect(url);
  }

  // No locale prefix in path → redirect to path with locale.
  const firstPathSegment = pathname.split('/')[1];
  if (!locales.includes(firstPathSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${localeValue}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Locale present but no additional path → redirect to /home
  const pathSegments = pathname.split('/').filter(Boolean);
  if (locales.includes(firstPathSegment) && pathSegments.length === 1) {
    const url = request.nextUrl.clone();
    url.pathname = `/${firstPathSegment}/home`;
    return NextResponse.redirect(url);
  }

  // Process with next-intl
  const response = intlMiddleware(request);

  // Set cookies for country and locale
  const existingCountryCode = request.cookies.get('COUNTRY_CODE')?.value;

  if (!existingCountryCode) {
    response.cookies.set('COUNTRY_CODE', countryCode, {
      path: '/',
      httpOnly: false
    });
  }

  response.cookies.set('BROWSER_LANG_CODE', localeValue, {
    path: '/',
    httpOnly: false
  });

  response.cookies.set('NEXT_LOCALE', firstPathSegment, {
    path: '/',
    httpOnly: false
  });

  const CSP = `
    default-src 'self' *.laaha.org:* 'unsafe-inline' 'unsafe-eval' *.sharethis.com:* *.cloudflare.com:* *.google-analytics.com:* *.googletagmanager.com:* *.gstatic.com:* *.googleapis.com:* *.fontawesome.com:* *.addtoany.com:* *.disqus.com:* *.facebook.com:* *.facebook.net:* *.google.com:* *.linkedin.com:* *.twitter.com:* *.youtube.com:* *.vimeo.com:* *.instagram.com *.newrelic.com:* *.nr-data.net:* *.jquery.js:* *.chosen.css:* *.opencagedata.com:* data:;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *.laaha.org:* *.google-analytics.com:* *.googletagmanager.com:* *.jsdelivr.net:* *.jquery.com:* *.cloudflare.com:* unpkg.com:* https://player.vimeo.com https://api.ipify.org;
    connect-src 'self' *.laaha.org:* https://api.ipify.org https://vimeo.com https://player.vimeo.com https://*.vimeo.com https://*.vimeocdn.com https://fonts.googleapis.com https://fonts.gstatic.com ws://localhost:* wss://localhost:*;
    style-src 'self' 'unsafe-inline' *.jsdelivr.net:* https://fonts.googleapis.com *.cloudflare.com:*;
    img-src 'self' *.google-analytics.com:* data: https://player.vimeo.com https://api.ipify.org https://i.vimeocdn.com;
    frame-src *.vimeo.com *.laaha.org:*;
    frame-ancestors 'self' *.laaha.org:*;
    font-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.gstatic.com *.gstatic.com:* *.googleusercontent.com:* *.googleapis.com:* *.fontawesome.com:* *.jsdelivr.net:* *.cloudflare.com:*;
    worker-src 'self' blob:;
    `.replace(/\s{2,}/g, ' ').trim()

  // response.headers.set('Content-Security-Policy', CSP);
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Set custom detection headers
  response.headers.set('X-Country-Code', countryCode);
  response.headers.set('X-Browser-Lang-Code', localeValue);

  // Smart cache: cache, but vary by country + language
  response.headers.set(
    'Cache-Control',
    'public, max-age=86400, stale-while-revalidate=3600'
  );
  response.headers.set('Vary', 'CF-IPCountry, Accept-Language');

  // Handle user session if exists
  const session = request.cookies.get('session')?.value;

  if (session) {
    try {
      const payload = await decrypt(session);

      const existingAccessToken = request.cookies.get('ACCESS_TOKEN')?.value;
      const existingRefreshToken = request.cookies.get('REFRESH_TOKEN')?.value;

      response.headers.set('x-user-id', payload?.payload?.userName || '');
      response.headers.set('x-avatar-url', payload?.payload.avatarUrl || '');
      response.headers.set('x-uid', payload?.payload.userId || '');
      response.headers.set('x-user-role', payload?.payload.userRole || '');
      response.headers.set('x-user-evaluator', payload?.payload.isEvaluator || '');
      response.headers.set('x-access-token', existingAccessToken);

      if (!existingAccessToken) {
        response.cookies.set('ACCESS_TOKEN', payload?.payload.accessToken, {
          path: '/',
          httpOnly: false,
          secure: true,
          expires: new Date(Date.now() + 15 * 60 * 1000)
        });
      }

      if (!existingRefreshToken) {
        response.cookies.set('REFRESH_TOKEN', payload?.payload.refreshToken, {
          path: '/',
          httpOnly: false
        });
      }
    } catch (error) {
      console.error('Error decrypting session:', error);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|_next/static|sw.js|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)'
  ]
};
