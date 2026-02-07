import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  // 로그인 페이지는 통과
  if (nextUrl.pathname.startsWith('/auth')) {
    // 이미 로그인된 사용자가 로그인 페이지에 접근하면 홈으로 보냄
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
    return;
  }

  const isAccountPage = nextUrl.pathname.startsWith('/account');

  if (isAccountPage) {
    if (!isLoggedIn) {
      // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
      // 원래 가려던 주소를 callbackUrl로 전달하여 로그인 후 복귀 가능하게 함
      const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl),
      );
    }
    return; // 로그인 된 상태면 통과
  }
  return;
});

export const config = {
  matcher: ['/account/:path*', '/auth/:path*'],
};
