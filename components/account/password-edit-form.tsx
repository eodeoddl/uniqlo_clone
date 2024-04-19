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
import { EditPasswordSchema } from '@/schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { editPassword, editPasswordByToken } from '@/actions/editPassword';
import { useSearchParams } from 'next/navigation';

export default function PasswordEditForm() {
  const form = useForm<z.infer<typeof EditPasswordSchema>>({
    resolver: zodResolver(EditPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof EditPasswordSchema>) => {
    console.log('onsubmit active');
    startTransition(async () => {
      token
        ? await editPasswordByToken(values, token)
        : await editPassword(values);
    });
  };

  return (
    <div className='flex items-center h-full'>
      <Card className='w-[400px] mx-auto h-fit'>
        <CardHeader className='text-center font-semibold text-3xl'>
          <h1>비밀번호 변경</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        placeholder='비밀번호'
                        disabled={isPending}
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
                        type='password'
                        placeholder='비밀번호 확인'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError />
              <Button type='submit' disabled={isPending}>
                변경하기
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
