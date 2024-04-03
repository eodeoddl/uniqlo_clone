'use server';
import { LoginSchema } from '@/schemas';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: '잘못된 입력 형식입니다.' };
  return { success: '이메일을 확인해 주세요!' };
};
