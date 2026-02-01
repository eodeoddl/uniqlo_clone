// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import { NextRequest, NextResponse } from 'next/server';
// const { auth: middleware } = NextAuth(authConfig);

// export default middleware((request: NextRequest) => {
//   // const url = request.nextUrl.clone();
//   // const { pathname } = url;
//   // const allowedTabs = ['women', 'men', 'kids', 'baby'];
//   // const tabMatch = pathname.match(/^\/(women|men|kids|baby)$/);
//   // if (tabMatch) {
//   //   const tab = tabMatch[1];
//   //   if (!allowedTabs.includes(tab)) {
//   //     return NextResponse.redirect(new URL('/', request.url));
//   //   }
//   // }
// });

// // export default NextAuth(authConfig).auth;

// // const { auth } = NextAuth(authConfig);

// // export default auth((req) => {
// //   const { nextUrl } = req;
// //   const isLoggedIn = !!req.auth;

// //   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
// //   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
// //   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

// //   if (isApiAuthRoute) return;
// //   if (isAuthRoute) {
// //     if (isLoggedIn)
// //       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
// //     return;
// //   }
// //   if (!isLoggedIn && !isPublicRoute)
// //     return Response.redirect(new URL("/auth/login", nextUrl));
// // });

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };\

// import NextAuth from 'next-auth';
// import { NextResponse } from 'next/server';
// import authConfig from './auth.config';

// const { auth } = NextAuth(authConfig);

import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  // 로그인 페이지는 통과
  if (nextUrl.pathname.startsWith('/auth')) {
    return;
  }

  // (protected) 그룹 보호
  if (
    nextUrl.pathname.startsWith('/account') ||
    nextUrl.pathname.startsWith('/(protected)')
  ) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/auth/login', nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: ['/account/:path*', '/(protected)/:path*'],
};

// export { auth as middleware } from '@/auth';

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

// export const runtime = 'experimental-edge';
