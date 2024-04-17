import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: '올바르지 않은 이메일 형식입니다.' })
    .min(1, { message: '이메일을 입력해주세요' }),
  password: z
    .string()
    .refine((data) => data.length >= 1, {
      message: '비밀번호를 입력해 주세요.',
    })
    .optional(),
  emailVerified: z
    .string()
    .optional()
    .transform((data) => (data ? new Date(data).toISOString() : null)),
});

const BaseResisterSchema = z.object({
  email: z
    .string()
    .email({ message: '올바르지 않은 이메일 형식입니다.' })
    .min(1, { message: '이메일을 입력해주세요' }),
  password: z.string().min(6, { message: '6자리 이상으로 설정해 주세요.' }),
  confirmPassword: z.string().min(1, { message: '필수 입력정보 입니다.' }),
  name: z.string().min(1, { message: '필수 입력 정보입니다.' }),
});

export const ResisterSchema = BaseResisterSchema.refine(
  (data) => data.password === data.confirmPassword,
  { message: '비밀번호가 일치하지 않습니다.', path: ['confirmPassword'] }
);

export const VerificationSchema = BaseResisterSchema.omit({
  confirmPassword: true,
}).extend({
  expires: z.date().refine((date) => date > new Date(), {
    message: '유효기간이 만료된 코드입니다.',
  }),
  token: z.string().min(1, { message: '인증코드를 발급 받아 주세요.' }),
});
