import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: { signIn: '/auth/login' },

  callbacks: {
    // authorized: async function ({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    //   if (isApiAuthRoute) return true;
    //   const isPublicRoute =
    //     publicRoutes.includes(nextUrl.pathname) ||
    //     publicRoutes.some((route) => nextUrl.pathname.startsWith(route));
    //   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    //   if (isAuthRoute) {
    //     if (isLoggedIn)
    //       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    //     return true;
    //   }
    //   if (!isLoggedIn && !isPublicRoute) {
    //     if (nextUrl.searchParams.get('token')) return true;
    //     return Response.redirect(new URL('/auth/login', nextUrl));
    //   }
    //   return true;
    // },
  },
  providers: [],
} satisfies NextAuthConfig;
