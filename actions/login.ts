'use server';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: '로그인중 오류가 발생했습니다. 다시 시도해 주세요' };
        case 'CallbackRouteError':
          return { error: error.cause?.err?.message };
        default:
          return { error: '오류가 발생했습니다.' };
      }
    }

    // if (error instanceof z.ZodError) {
    //   console.log('zod error 보자');
    // }
    throw error;
  }
};
