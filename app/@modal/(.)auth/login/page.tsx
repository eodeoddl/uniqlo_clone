import LoginForm from '@/components/auth/login-form';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { headers } from 'next/headers';

export default async function Modal() {
  const referer = headers().get('referer');
  const redirectTo = referer
    ? new URL(referer).pathname + new URL(referer).search
    : '/';

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent useRouterModal className='w-fit p-0'>
        <AlertDialogTitle className='hidden'>로그인</AlertDialogTitle>
        <AlertDialogDescription className='hidden'>
          로그인을하고 더많은 기능을 이용해 보세요!
        </AlertDialogDescription>
        <LoginForm redirectTo={redirectTo} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
