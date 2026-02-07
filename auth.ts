import NextAuth, { CredentialsSignin, type DefaultSession } from 'next-auth';
import { authConfig } from './auth.config';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role?: 'ADMIN' | 'USER';
      token?: string;
      refreshToken?: string;
    } & DefaultSession['user'];
  }
}

class CustomError extends CredentialsSignin {}
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
