'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const callback = searchParams.get('callback');
    router.replace(`${callback}`);
  }, [router, searchParams]);
  return null;
}
