'use client';
import CardWrapper from './card-wrapper';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../ui/form-error';
import { resister } from '@/actions/resister';

export default function VerificationForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<{ token: string }>({
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = ({ token }: { token: string }) => {
    startTransition(async () => {
      try {
        await resister(token);
      } catch (error) {
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
          <FormField
            name='token'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex items-center justify-center gap-3 w-full'>
                <FormControl>
                  <Input
                    placeholder='인증코드'
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <Button type='submit' disabled={isPending}>
                  입력
                </Button>
              </FormItem>
            )}
          />
          <FormError message={error} />
        </form>
      </Form>
    </CardWrapper>
  );
}
