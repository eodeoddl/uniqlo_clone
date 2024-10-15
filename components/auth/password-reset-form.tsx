'use client';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import BackButton from './back-button';
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
import { sendVerificationEmail } from '@/actions/editPassword';
import { isKeyOf } from '@/lib/utils';

export default function PasswordResetForm() {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });
  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    try {
      const { field, message } = await sendVerificationEmail(values);
      if (isKeyOf(field, values)) form.setError(field, { message });
    } catch (error) {
      if (error instanceof Error) {
        form.setError('root', {
          message: '알수 없는 오류 입니다. 잠시후에 다시 시도해 주세요.',
        });
      }
    }
  };

  return (
    <div className='flex items-center h-full'>
      <Card className='w-[400px] mx-auto h-fit'>
        <CardHeader className='text-center font-semibold text-3xl'>
          <h1>비밀번호 재설정</h1>
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
                    <div className='flex items-center justify-center gap-3 w-full'>
                      <FormControl>
                        <Input
                          {...field}
                          type='email'
                          placeholder='email'
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <Button type='submit'>메일 전송</Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <FormError message={form.formState.errors.root.message} />
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className='justify-center'>
          <BackButton href='/' label='홈으로가기' disabled={isSubmitting} />
        </CardFooter>
      </Card>
    </div>
  );
}
