/**
 *  공개적으로 접근할 수 있는 routes.
 *  인증이 필요하지 않음.
 *  @type {string[]}
 */
export const publicRoutes = [
  '/',
  '/auth/verification',
  '/auth/verification/success',
];

/**
 * 로그인 사용자만 접근가능한 routes.
 * 로그인 되어있지않다면 /auth/login으로 redirect
 * @type {string[]}
 */

export const protectedRoutes = ['/editPassword'];

/**
 *  인증에 필요한 routes.
 *  인증이 성공하면 DEFAULT_LOGIN_REDIRECT path로 이동
 *  @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/resister', '/auth/error'];

/**
 *  API routes.
 *  해당 접두사로 시작하는 routes는 API인증으로 사용됩니다.
 *  @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 *  로그인 후 기본 REDIRECT 경로
 *  @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
