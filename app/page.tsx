import { Button } from '@/components/ui/button';
import { CircleUserRound } from 'lucide-react';
import LoginButton from '@/components/auth/login-button';
import Test from '@/components/home/test';

export default async function Home() {
  return <Test />;
  // return (
  //   <main className='flex flex-col justify-center items-center h-full'>
  //     <div className='space-y-6 text-center'>
  //       <h1 className='flex justify-center items-center gap-x-5 text-6xl text-bold text-black drop-shadow-md'>
  //         <CircleUserRound className='w-10 h-10' />
  //         계정
  //       </h1>
  //       <p className='text-black text-lg'>계정을 등록하고 이용해 보세요!</p>
  //       <LoginButton>
  //         <Button variant='secondary' size='lg'>
  //           로그인
  //         </Button>
  //       </LoginButton>
  //     </div>
  //   </main>
  // );
}
