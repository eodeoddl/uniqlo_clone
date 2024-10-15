import { cn } from '@/lib/utils';
import { TriangleAlert } from 'lucide-react';

interface FormErrorProps {
  message?: string;
  className?: string;
}
export default function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;
  return (
    <div
      className={cn(
        'bg-destructive/15 p-3 rouned-md flex items-center gap-x-2 text-sm text-destructive',
        className
      )}
    >
      <TriangleAlert className='w-4 h-4' />
      <p>{message}</p>
    </div>
  );
}
