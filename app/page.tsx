import LoginButton from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='flex flex-col justify-center items-center h-full'>
      <div className='space-y-6 text-center'>
        <h1 className='text-6xl text-semibold text-black drop-shadow-md'>
          Auth
        </h1>
        <p className='text-black text-lg'>
          A Simple Authentication Application
        </p>
        <LoginButton>
          <Button variant='secondary' size='lg'>
            Sign In
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
