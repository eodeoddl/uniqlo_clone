import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: '올바르지 않은 이메일 형식입니다.' })
    .min(1, { message: '이메일을 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
});

export const ResisterSchema = z.object({
  email: z
    .string()
    .email({ message: '올바르지 않은 이메일 형식입니다.' })
    .min(1, { message: '이메일을 입력해주세요' }),
  password: z.string().min(6, { message: '6자리 이상으로 설정해 주세요.' }),
  name: z.string().min(1, { message: '필수 입력 정보입니다.' }),
});
