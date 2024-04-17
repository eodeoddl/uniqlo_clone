'use client';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import BackButton from './back-button';
import Header from './header';
import { Form } from '../ui/form';

export default function PasswordResetForm() {
  const form = useForm();

  return (
    <Card>
      <CardHeader>
        <Header label='비밀번호 재설정' />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form></form>
        </Form>
      </CardContent>
      <CardFooter>
        <BackButton href='/auth/login' label='로그인으로 돌아가기' />
      </CardFooter>
    </Card>
  );
}
