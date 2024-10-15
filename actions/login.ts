'use server';
import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          throw new Error(
            '로그인에 실패했습니다. 이메일 또는 비밀번호가 잘못되었습니다.'
          );
        case 'CallbackRouteError':
          throw new Error(error?.cause?.err?.message);
        default:
          throw error;
      }
    }

    throw error;
  }
};
