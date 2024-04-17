'use server';

import { db } from '@/lib/db';
import { VerificationSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const verificationValidation = async (
  verification: z.infer<typeof VerificationSchema>,
  value: string
) => {
  const validatedFields = VerificationSchema.safeParse(verification);

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors[0].message);
  }

  const { email, password, name, token } = validatedFields.data;

  const isTokenMatched = await bcrypt.compare(value, token);
  if (!isTokenMatched) throw new Error('인증코드가 일치하지 않습니다.');

  const emailVerified = new Date();
  console.log('user is success to create account at ', emailVerified);

  const createAccount = async () =>
    await db.user.create({
      data: {
        email,
        password,
        name,
        emailVerified,
      },
    });

  const loginWithCreateAccount = async () =>
    await signIn('credentials', {
      email,
      emailVerified,
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
