'use server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { sendPasswordEditEmail } from '@/lib/mail';
import { EditPasswordSchema, ResetPasswordSchema } from '@/schemas';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { generateToken } from '@/lib/token';
import { getUserByEmail } from '@/data/user';
import { tokenValidation } from './verification';
import { VerificationError } from '@/lib/errors';

export const editPassword = async (
  values: z.infer<typeof EditPasswordSchema>
) => {
  const session = await auth();
  if (!session?.user.email) throw Error('로그인을 해주세요.');

  const password = await bcrypt.hash(values.password, 10);

  await db.user.update({
    where: { email: session.user.email },
    data: {
      password,
    },
  });

  redirect('/account/passwordEdit/success');
};

export const editPasswordByToken = async (
  values: z.infer<typeof EditPasswordSchema>,
  token: string
) => {
  try {
    const { email } = await tokenValidation(token);

    const password = await bcrypt.hash(values.password, 10);

    await db.user.update({
      where: { email },
      data: {
        password,
      },
    });

    await db.verification.delete({ where: { email } });
  } catch (error) {
    if (error instanceof VerificationError)
      return { message: error.message, type: error.name };
    throw Error('알수없는 에러가 발생 했습니다. 잠시후 다시 시도해주세요.');
  }

  redirect('/account/passwordEdit/success');
};

export const sendVerificationEmail = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const { token, expires } = generateToken();

  const existingUser = await getUserByEmail(values.email);
  if (!existingUser)
    return { field: 'email', message: '존재하지않는 회원 입니다.' };

  await db.verification.upsert({
    where: { email: values.email },
    update: { token, expires_at: expires },
    create: {
      email: values.email,
      token,
      expires_at: expires,
    },
  });

  await sendPasswordEditEmail(values.email, token);

  redirect('/account/passwordReset/success');
};
