import { cn } from '@/lib/utils';

export default function Header({ label }: { label: string }) {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
      <h1 className={cn('text-3xl font-semibold')}>로그인</h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
}
