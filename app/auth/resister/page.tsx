import ResisterForm from '@/components/auth/resister-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResisterForm />
    </Suspense>
  );
}
