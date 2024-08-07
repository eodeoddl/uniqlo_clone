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
        <LoginForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}
