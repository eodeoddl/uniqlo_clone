import BackButton from '@/components/auth/back-button';
import FormSuccess from '@/components/ui/form-success';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export default async function Page() {
  const session = await auth();
  if (!session) redirect('/modal/auth/login');
  const message = `안녕하세요 ${session.user.name}님. 유니클로에 오신 것을 환영합니다!\n 회원가입이 성공적으로 완료되었습니다.`;
  return (
    <div>
      <FormSuccess message={message} />
      <BackButton href='/' label='홈으로 돌아가기' disabled={false} />
    </div>
  );
}
