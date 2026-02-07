import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';
import NextAuth, { CredentialsSignin, type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { authConfig } from './auth.config';
import bcrypt from 'bcryptjs';
import { db } from './lib/db';
import { getUserByEmail, getUserById } from './data/user';

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
