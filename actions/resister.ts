'use server';
import { ResisterSchema } from './../schemas/index';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateToken } from '@/lib/token';

export const resister = async (values: z.infer<typeof ResisterSchema>) => {
  const validatedFields = ResisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: '잘못된 입력 방식입니다.' };
  const { email, password, name } = values;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: '이미 사용중인 Email 입니다.' };

  // await db.user.create({
  //   data: {
  //     email,
  //     password: hashedPassword,
  //     name,
  //   },
  // });
  const verification = generateToken();
  const hashedToken = await bcrypt.hash(verification.token, 10);
  await sendVerificationEmail(email, verification.token);

  return {
    verification: {
      token: hashedToken,
      expires: verification.expires,
      email,
      name,
      password: hashedPassword,
    },
  };
};
