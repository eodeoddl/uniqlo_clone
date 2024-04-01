import CardWrapper from './card-wrapper';

export default function LoginForm() {
  return (
    <CardWrapper
      headerLabel='안녕하세요?'
      backButtonLabel='계정이 없으신가요?'
      backButtonHref='/auth/resister'
      showSocial
    >
      LoginForm
    </CardWrapper>
  );
}
