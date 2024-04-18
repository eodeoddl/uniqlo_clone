'use server';

import { db } from '@/lib/db';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { getVerification } from '@/data/verification-token';

export const verificationValidation = async (token: string) => {
  const verification = await getVerification(token);

  if (!verification) throw Error('인증코드가 일치하지 않습니다.');

  if (verification.expires_at.getTime() <= new Date().getTime())
    throw Error(
      '기간이 만료된 인증코드입니다. 회원가입 절차를 다시 밟아주세요.'
    );

  const createAccount = async () =>
    await db.user.create({
      data: {
        email: verification.email,
        password: verification.password,
        name: verification.name,
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
      await db.user.delete({ where: { email: verification.email } });
    }
    throw error;
  }
};
