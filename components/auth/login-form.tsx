'use client';

import * as z from 'zod';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useRouter, useSearchParams } from 'next/navigation';

import BackButton from './back-button';
import { Button } from '../ui/button';
import FormError from '../ui/form-error';
import Header from './header';
import { Input } from '../ui/input';
import Link from 'next/link';
import { LoginSchema } from '@/schemas';
import Social from './social';
import { login } from '@/actions/login';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { isSubmitting } = form.formState;
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectionWithError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? '다른 로그인 제공자에서 사용되는 이메일 링크입니다.'
      : '';

  const [error, setError] = useState<string | undefined>();

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError('');
    try {
      await login(values);
      router.back();
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          '로그인 중 알 수 없는 문제가 발생했습니다. 다시 시도해 주세요.',
        );
      }
    }
  };

  return (
    <Card className='w-full sm:w-fit sm:shadow-md'>
      <CardHeader>
        <Header label='로그인' />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder='Email을 입력하세요'
                        type='email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder='비밀번호를 입력하세요'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || redirectionWithError} />
            <Button type='submit' disabled={isSubmitting} className='w-full'>
              로그인
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex-col flex-wrap gap-2'>
        <Social isSubmitting={isSubmitting} />
        <BackButton
          href='/auth/resister'
          label='계정이 없으신가요?'
          disabled={isSubmitting}
        />
        <Button
          size='sm'
          variant='link'
          className='font-normal'
          disabled={isSubmitting}
        >
          <Link href='/auth/passwordReset'>비밀번호를 잊어버리셨나요?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
