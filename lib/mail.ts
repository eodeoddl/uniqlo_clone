import PasswordEditEmailTemplate from '@/components/account/passwordEditEmailTemplate';
import VerifyEmailTemplate from '@/components/auth/verifyEmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '유니클로 클론 프로젝트 회원가입 인증메일 입니다.',
    react: VerifyEmailTemplate({ token }),
  });
};

export const sendPasswordEditEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/account/passwordEdit?token=${token}`;
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '비밀번호 재설정',
    react: PasswordEditEmailTemplate({ email, confirmLink }),
  });
};
