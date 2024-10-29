import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';

import Image from 'next/image';
import { ImageType } from '@/types';
import { db } from '@/lib/db';

export default async function Modal({ params }: { params: { id: string } }) {
  const photo = (await db.photo.findUnique({
    where: { id: params.id },
  })) as ImageType;

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent
        useRouterModal
        className='grid grid-cols-1 sm:gap-0 sm:grid-cols-[1fr_2fr] overflow-hidden h-screen w-full sm:w-10/12 lg:w-1/2 sm:h-[60vh] lg:h-[70vh] sm:p-0'
      >
        <div className='relative'>
          <Image
            src={photo.urls.small}
            alt={photo.alt_description || photo.id}
            fill
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
