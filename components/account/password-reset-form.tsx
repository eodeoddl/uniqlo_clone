'use client';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import BackButton from '../auth/back-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import FormError from '../ui/form-error';
import { Button } from '../ui/button';
import { ResetPasswordSchema } from '@/schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { sendVerificationEmail } from '@/actions/editPassword';

export default function PasswordResetForm() {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    startTransition(async () => {
      await sendVerificationEmail(values);
    });
  };

  return (
    <div className='flex items-center h-full'>
      <Card className='w-[400px] mx-auto h-fit'>
        <CardHeader className='text-center font-semibold text-3xl'>
          <h1>비밀번호 변경</h1>
          <p className='text-muted-foreground text-sm'>
            회원가입 시 등록하신 이메일 주소를 입력해 주세요. 비밀번호 재설정
            링크가 포함된 안내 메일이 발송됩니다.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일(아이디)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        placeholder='email'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError />
              <Button type='submit' disabled={isPending}>
                전송
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <BackButton href='/auth/login' label='뒤로가기' />
        </CardFooter>
      </Card>
    </div>
  );
}
