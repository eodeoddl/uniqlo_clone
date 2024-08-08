import LoginForm from '@/components/auth/login-form';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default async function Modal() {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent useRouterModal className='w-fit p-0'>
        <AlertDialogTitle className='hidden'>로그인</AlertDialogTitle>
        <AlertDialogDescription className='hidden'>
          로그인을하고 더많은 기능을 이용해 보세요!
        </AlertDialogDescription>
        <LoginForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}
