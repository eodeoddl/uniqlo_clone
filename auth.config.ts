import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import type { NextAuthConfig } from 'next-auth';
import { LoginSchema } from './schemas';
import { getUserById } from './data/user';

export default {
  // providers: [
  //   CredentialsProvider({
  //     async authorize(credentials) {
  //       console.log(
  //         'callback function of Credentials Provider => ',
  //         credentials
  //       );
  //       const isValidatedFields = LoginSchema.safeParse(credentials);
  //       if (isValidatedFields.success) {
  //         const { email, password } = isValidatedFields.data;
  //         const user = await getUserById(email);
  //         if (!user || user.password !== password) return null;
  //         // const passwordMatch = await bcrypt.compare(user.password, password);
  //         // if (passwordMatch) return user;
  //       }
  //       return null;
  //     },
  //   }),
  // ],
  providers: [],
} satisfies NextAuthConfig;
