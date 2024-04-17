export default function PasswordEditEmailTemplate({
  email,
  confirmLink,
}: {
  email: string;
  confirmLink: string;
}) {
  return (
    <div>
      고객님 안녕하세요. <br />
      유니클로 온라인 스토어입니다. <br />
      고객님의 사용 아이디: {email} <br />
      <br />
      유니클로 온라인 스토어를 이용해 주셔서 진심으로 감사드립니다. <br />
      비밀번호 재설정 방법 안내드립니다.
      <br />
      <br />
      <span>비밀번호 재설정 : </span>
      <br />
      ● 아래 URL을 통해, 새로운 비밀번호를 입력해 주세요
      <br />
      <a href={confirmLink}>{confirmLink}</a>
      <br />
      <br />
      안내사항 : <br />● 위 URL은 메일 발송된 후 2시간이 지나면 만료됩니다.
      <br /> ● URL 접속이 안되거나, 만료된 경우에는 비밀번호 재설정을 다시 한번
      진행해 주셔야 합니다. <br />
      앞으로도 유니클로 온라인스토어의 많은 이용 부탁드리겠습니다. 감사합니다.
    </div>
  );
}
