import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";
import { db } from "./lib/db";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const isValidatedFields = LoginSchema.safeParse(credentials);
        if (isValidatedFields.success) {
          const { email, password } = isValidatedFields.data;
          const user = await getUserById(email);
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(user.password, password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
});
