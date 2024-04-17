'use client';
import CardWrapper from './card-wrapper';
import { useState, useTransition } from 'react';
import { verificationValidation } from '@/actions/verification';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../ui/form-error';
import { useRouter } from 'next/navigation';

export default function VerificationForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<{ token: string }>({
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = ({ token }: { token: string }) => {
    const isOnSession = sessionStorage.getItem('token');
    if (!isOnSession)
      return setError(
        '유효하지않은세션 입니다. 인증토큰을 발급받고 진행해 주세요.'
      );

    const verification = JSON.parse(isOnSession, (key, value) => {
      if (key === 'expires') return new Date(value);
      return value;
    });

    startTransition(async () => {
      try {
        await verificationValidation(verification, token);
        sessionStorage.removeItem('token');
        router.push('/auth/verification/success?type=resister');
      } catch (error) {
        console.log('catch error in verification form ');
        if (error instanceof Error) setError(error?.message);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel='이메일로 인증코드가 발송되었습니다.'
      backButtonHref='/auth/login'
      backButtonLabel='로그인 페이지로 돌아가기'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <div className='flex items-center justify-center gap-3 w-full'>
            <FormField
              name='token'
              control={form.control}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      placeholder='인증코드'
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isPending}>
              입력
            </Button>
          </div>
          <FormError message={error} />
        </form>
      </Form>
    </CardWrapper>
  );
}
