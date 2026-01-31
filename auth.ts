// import GitHub from 'next-auth/providers/github';
// import Google from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { LoginSchema } from './schemas';
// import NextAuth, { CredentialsSignin, type DefaultSession } from 'next-auth';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import { authConfig } from './auth.config';
// import bcrypt from 'bcrypt';
// import { db } from './lib/db';
// import { getUserByEmail, getUserById } from './data/user';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//       role?: 'ADMIN' | 'USER';
//       token?: string;
//       refreshToken?: string;
//     } & DefaultSession['user'];
//   }
// }

// class CustomError extends CredentialsSignin {}

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   ...authConfig,
//   adapter: PrismaAdapter(db),
//   session: { strategy: 'jwt' },
//   events: {
//     async linkAccount({ user }) {
//       await db.user.update({
//         where: { id: user.id },
//         data: { emailVerified: new Date() },
//       });
//     },
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider !== 'credentials') return true;
//       const existingUser = await getUserById(user.id);

//       if (!existingUser?.emailVerified) return false;

//       return true;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           role: token.role,
//           token: token.token,
//           refreshToken: token.refreshToken,
//         },
//       };
//     },
//     async jwt({ token }) {
//       if (token.sub) {
//         const user = await getUserById(token.sub);
//         if (user) {
//           console.log('token callback => ', user);
//           token.role = user.role;
//           return token;
//         }
//       }
//       return token;
//     },
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         let user = null;
//         const { email, password } = await LoginSchema.parseAsync(credentials);
//         user = await getUserByEmail(email);
//         if (!user || !user.password)
//           throw new Error(
//             '회원가입이 필요한 이메일 입니다. 회원가입을 진행해 주세요.',
//           );

//         if (password) {
//           if (!user.password) {
//             throw new Error('이 계정은 비밀번호 로그인을 지원하지 않습니다.');
//           }

//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (!passwordMatch) throw new Error('비밀번호가 일치하지 않습니다.');
//         }

//         // if (!user.password) {
//         //   throw new Error('이 계정은 비밀번호 로그인을 지원하지 않습니다.');
//         // }
//         // const passwordMatch = await bcrypt.compare(password, user.password);

//         // if (!passwordMatch) throw new Error('비밀번호가 일치하지 않습니다.');

//         return user;
//       },
//     }),
//     GitHub({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     Google({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
// });

// import NextAuth, { type DefaultSession } from 'next-auth';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import { authConfig } from './auth.config';
// import { db } from './lib/db';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GitHub from 'next-auth/providers/github';
// import Google from 'next-auth/providers/google';
// import { LoginSchema } from './schemas';
// import { getUserByEmail, getUserById } from './data/user';
// import bcrypt from 'bcrypt';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//       role?: 'ADMIN' | 'USER';
//       token?: string;
//       refreshToken?: string;
//     } & DefaultSession['user'];
//   }
// }

// // NextAuth 핸들러
// const authHandler = NextAuth({
//   ...authConfig,
//   adapter: PrismaAdapter(db),
//   session: { strategy: 'jwt' },
//   events: {
//     async linkAccount({ user }) {
//       await db.user.update({
//         where: { id: user.id },
//         data: { emailVerified: new Date() },
//       });
//     },
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider !== 'credentials') return true;
//       const existingUser = await getUserById(user.id);
//       if (!existingUser?.emailVerified) return false;
//       return true;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           role: token.role,
//           token: token.token,
//           refreshToken: token.refreshToken,
//         },
//       };
//     },
//     async jwt({ token }) {
//       if (token.sub) {
//         const user = await getUserById(token.sub);
//         if (user) token.role = user.role;
//       }
//       return token;
//     },
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         const { email, password } = await LoginSchema.parseAsync(credentials);
//         const user = await getUserByEmail(email);
//         if (!user) throw new Error('회원가입이 필요한 이메일 입니다.');
//         if (password) {
//           if (!user.password)
//             throw new Error('비밀번호 로그인을 지원하지 않습니다.');
//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (!passwordMatch) throw new Error('비밀번호가 일치하지 않습니다.');
//         }
//         return user;
//       },
//     }),
//     GitHub({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//     Google({
//       clientId: process.env.GOOGLE_ID!,
//       clientSecret: process.env.GOOGLE_SECRET!,
//     }),
//   ],
// });

// export { authHandler };

// auth.ts
import NextAuth, { type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { authConfig } from './auth.config';
import { db } from './lib/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { LoginSchema } from './schemas';
import { getUserByEmail, getUserById } from './data/user';
import bcrypt from 'bcrypt';

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

const auth = NextAuth({
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
        if (user) token.role = user.role;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = await LoginSchema.parseAsync(credentials);
        const user = await getUserByEmail(email);
        if (!user) throw new Error('회원가입이 필요한 이메일 입니다.');
        if (password) {
          if (!user.password)
            throw new Error('비밀번호 로그인을 지원하지 않습니다.');
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) throw new Error('비밀번호가 일치하지 않습니다.');
        }
        return user;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
});

export { auth };
