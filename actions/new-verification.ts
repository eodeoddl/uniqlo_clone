'use server';

import { db } from '@/lib/db';
import { VerificationSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';

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

  await db.user.create({
    data: {
      email,
      password,
      name,
      emailVerified: new Date(),
    },
  });

  redirect('/auth/login');
};
