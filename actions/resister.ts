'use server';
import { ResisterSchema } from './../schemas/index';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateToken } from '@/lib/token';
import { signIn } from '@/auth';
import { tokenValidation } from './verification';
import { AuthError } from 'next-auth';

export const sendResisterToken = async (
  values: z.infer<typeof ResisterSchema>
) => {
  const validatedFields = ResisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: '잘못된 입력 방식입니다.' };
  const { email, password, name } = values;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: '이미 사용중인 Email 입니다.' };

  const { token, expires } = generateToken();

  try {
    await sendVerificationEmail(email, token);

    await db.verification.upsert({
      where: { email },
      update: { token, expires_at: expires },
      create: {
        email,
        name,
        password: hashedPassword,
        token,
        expires_at: expires,
      },
    });
    return { redirectPath: '/auth/verification' };
  } catch (error) {
    return { error: '알 수 없는 오류' };
  }
};

export const resister = async (token: string) => {
  const { email, password, name } = await tokenValidation(token);

  const createAccount = async () =>
    await db.user.create({
      data: {
        email,
        password,
        name,
        emailVerified: new Date(),
      },
    });

  const loginWithCreateAccount = async () =>
    await signIn('credentials', {
      token,
      redirectTo: '/auth/verification/success',
    });

  try {
    await createAccount();
    await loginWithCreateAccount();
  } catch (error) {
    if (error instanceof AuthError) {
      await db.user.delete({ where: { email } });
    }
    throw error;
  }
};
