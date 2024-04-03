'use server';
import { ResisterSchema } from './../schemas/index';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const resister = async (valuse: z.infer<typeof ResisterSchema>) => {
  const validatedFields = ResisterSchema.safeParse(valuse);
  if (!validatedFields.success) return { error: '잘못된 입력 형식입니다.' };

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // in
  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: '이미 사용중인 Email 입니다.' };

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return { success: '성공적으로 계정이 생성 되었습니다.' };
};
