import BackButton from '../auth/back-button';
import { Card, CardFooter, CardHeader } from '../ui/card';

export default function PasswordEditSuccess() {
  return (
    <div className='flex items-center h-full'>
      <Card className='w-[400px] mx-auto h-fit'>
        <CardHeader className='text-center font-semibold text-3xl'>
          <h1>비밀번호 재설정</h1>
          <p className='text-muted-foreground text-sm'>
            비밀번호가 업데이트 되었습니다.
          </p>
        </CardHeader>
        {/* <CardContent>
          <p className='w-full whitespace-pre-wrap'>
            {`회원정보 내 등록한 이메일 주소로 메시지가 전송되었습니다.비밀번호 재설정을 원하시는 경우, 해당 이메일 확인 후 진행 부탁드립니다.\n비밀번호 재설정 링크는 요청 후 1시간 후에 만료됩니다.`}
          </p>
        </CardContent> */}
        <CardFooter className='justify-center'>
          <BackButton href='/' label='홈으로' disabled={false} />
        </CardFooter>
      </Card>
    </div>
  );
}
