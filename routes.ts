/**
 *  공개적으로 접근할 수 있는 routes.
 *  인증이 필요하지 않음.
 *  @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 *  인증이 필요한 routes.
 *  인증이 성공하면 DEFAULT_LOGIN_REDIRECT path로 이동
 *  @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/resister'];

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
