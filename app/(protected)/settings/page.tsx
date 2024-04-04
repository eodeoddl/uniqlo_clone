import { auth, signOut } from '@/auth';

export default async function Page() {
  const session = await auth();
  return (
    <>
      <span>{JSON.stringify(session)}</span>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type='submit'>로그아웃</button>
      </form>
    </>
  );
}
