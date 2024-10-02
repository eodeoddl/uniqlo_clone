'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import CardWrapper from './card-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResisterSchema } from '@/schemas';
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
import { useState } from 'react';
import { sendResisterToken } from '@/actions/resister';
import { redirect } from 'next/navigation';

export default function ResisterForm() {
  const form = useForm<z.infer<typeof ResisterSchema>>({
    resolver: zodResolver(ResisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
  });
  const { isSubmitting } = form.formState;

  const [error, setError] = useState<string | undefined>();

  const onSubmit = async (values: z.infer<typeof ResisterSchema>) => {
    setError('');

    const { redirectPath, error } = await sendResisterToken(values);
    if (redirectPath) redirect(redirectPath);
    else if (error) setError(error);
  };

  return (
    <CardWrapper
      headerLabel='계정을 생성하세요.'
      backButtonLabel='계정이 있으신가요?'
      backButtonHref='/auth/login'
      showSocial
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>닉네임</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder='닉네임을 입력하세요'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder='비밀번호를 확인하세요'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button type='submit' disabled={isSubmitting} className='w-full'>
            계정 생성하기
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
