import LoginForm from '@/components/auth/login-form';
import { headers } from 'next/headers';

export default function Page() {
  const referer = headers().get('referer');
  const redirectTo = referer
    ? new URL(referer).pathname + new URL(referer).search
    : '/';
  return <LoginForm redirectTo={redirectTo} />;
}
