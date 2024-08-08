'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../ui/form-error';
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import Header from './header';
import BackButton from './back-button';
import Social from './social';
import Link from 'next/link';

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectionWithError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? '다른 로그인 제공자에서 사용되는 이메일 링크입니다.'
      : '';

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');

    startTransition(async () => {
      const res = await login(values);
      if (res?.error) setError(res?.error);
      // else router.back();
    });
    console.log('end transition => ', error, isPending);
    if (!isPending && !error) router.back();
  };

  return (
    <Card className='w-10/12 sm:w-fit sm:shadow-md'>
      <CardHeader>
        <Header label='안녕하세요?' />
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
                        disabled={isPending}
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
                        disabled={isPending}
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
            <Button type='submit' disabled={isPending} className='w-full'>
              로그인
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex-col flex-wrap gap-2'>
        <Social />
        <BackButton href='/auth/resister' label='계정이 없으신가요?' />
        <Button size='sm' variant='link' className='font-normal'>
          <Link href='/account/passwordReset'>비밀번호를 잊어버리셨나요?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
