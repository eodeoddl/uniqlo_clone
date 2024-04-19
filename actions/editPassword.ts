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

  redirect('/settings');
};

export const editPasswordByToken = async (
  values: z.infer<typeof EditPasswordSchema>,
  token: string
) => {
  console.log(values, token);

  // 여기서 db verification 코드 검증 후 비밀번호 update 작업 실행.
};

export const sendVerificationEmail = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const { token, expires } = generateToken();

  const existingUser = await getUserByEmail(values.email);
  if (!existingUser) throw Error('존재하지않는 회원 입니다.');

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
};
