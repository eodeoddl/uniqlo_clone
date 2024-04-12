export default function EmailTemplate({ token }: { token: string }) {
  return (
    <div className='text-xl text-center'>
      <p className='font-semibold'>
        안녕하세요? 회원가입을 위한 인증링크 입니다.
        <br />
        아래의 코드를 이용해서 인증해 주세요!
        <br />
        해당 코드는 1시간이 지나면 인증이 불가합니다. 1시간이 지나면 다시
        회원가입 절차를 밟아 주세요.
      </p>
      <b className='font-bold'>{token}</b>
    </div>
  );
}
