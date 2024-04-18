import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';
import NextAuth, { type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { authConfig } from './auth.config';
import bcrypt from 'bcrypt';
import { db } from './lib/db';
import { getUserByEmail, getUserById } from './data/user';
import { deleteVerification, getVerification } from './data/verification-token';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: 'ADMIN' | 'USER';
      token?: string;
      refreshToken?: string;
    } & DefaultSession['user'];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;
      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          token: token.token,
          refreshToken: token.refreshToken,
        },
      };
    },
    async jwt({ token }) {
      if (token.sub) {
        const user = await getUserById(token.sub);
        if (user) {
          console.log('token callback => ', user);
          token.role = user.role;
          return token;
        }
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        let user = null;
        const { email, password, token } = await LoginSchema.parseAsync(
          credentials
        );

        if (token) {
          const isVerified = await getVerification(token);
          await deleteVerification(token);
          if (isVerified) return await getUserByEmail(isVerified.email);
        }

        user = await getUserByEmail(email);

        if (!user || !user.password)
          throw new Error(
            '회원가입이 필요한 이메일 입니다. 회원가입을 진행해 주세요.'
          );

        if (password) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return user;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});
