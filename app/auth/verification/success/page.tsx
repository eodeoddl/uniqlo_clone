'use client';

import BackButton from '@/components/auth/back-button';
import FormSuccess from '@/components/ui/form-success';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || null;
  if (!type) return null;

  const message = (() => {
    switch (type) {
      case 'resister':
        return '안녕하세요 유니클로에 오신 것을 환영합니다! 회원가입이 성공적으로 완료되었습니다.';
    }
  })();

  return (
    <div>
      <FormSuccess message={message} />
      <BackButton href='/auth/login' label='로그인 하기' />
      <BackButton href='/' label='홈으로 돌아가기' />
    </div>
  );
}
