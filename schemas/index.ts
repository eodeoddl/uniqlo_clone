import * as z from 'zod';

export const LoginSchema = z
  .object({
    email: z
      .string()
      .email({ message: '올바르지 않은 이메일 형식입니다.' })
      .optional(),
    password: z
      .string()
      .refine((data) => data.length >= 1, {
        message: '비밀번호를 입력해 주세요.',
      })
      .optional(),
    token: z.string().optional(),
    // redirectTo: z.string(),
  })
  .refine(
    ({ email, password, token }) => {
      if (token) return true;

      if (token === undefined && email && password) return true;

      if (email && !password) return false;

      return !(!email && !password && !token);
    },
    { message: '필수값을 모두 입력해 주세요.' }
  );

const BaseResisterSchema = z.object({
  email: z
    .string()
    .email({ message: '올바르지 않은 이메일 형식입니다.' })
    .min(1, { message: '이메일을 입력해주세요' }),
  password: z
    .string()
    .min(1, { message: '필수 입력 정보입니다.' })
    .min(6, { message: '6자리 이상으로 설정해 주세요.' }),
  confirmPassword: z.string().min(1, { message: '필수 입력정보 입니다.' }),
  name: z.string().min(1, { message: '필수 입력 정보입니다.' }),
});

export const ResisterSchema = BaseResisterSchema.refine(
  (data) => data.password === data.confirmPassword,
  { message: '비밀번호가 일치하지 않습니다.', path: ['confirmPassword'] }
);

export const EditPasswordSchema = BaseResisterSchema.pick({
  password: true,
  confirmPassword: true,
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
});

export const ResetPasswordSchema = BaseResisterSchema.pick({ email: true });
