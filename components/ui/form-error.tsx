import { TriangleAlert } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}
export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <div className='bg-destructive/15 p-3 rouned-md flex items-center gap-x-2 text-sm text-destructive'>
      <TriangleAlert className='w-4 h-4' />
      <p>{message}</p>
    </div>
  );
}
