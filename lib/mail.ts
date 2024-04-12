import EmailTemplate from '@/components/auth/emailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  // const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '유니클로 클론 프로젝트 회원가입 인증메일 입니다.',
    react: EmailTemplate({ token }),
  });
};
