import Image from 'next/image';
import { ImageType } from '@/types';
import { Download, Heart, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PhotoGridProps {
  fetchFunction: (skip: number, limit: number) => Promise<ImageType[]>;
  initialData: ImageType[];
  session: any;
}

export default function PhotoGrid({
  fetchFunction,
  initialData,
  session,
}: PhotoGridProps) {
  const { data, loaderRef } = useInfiniteScroll<ImageType>({
    fetchFunction,
    initialData,
    limit: 10,
  });
  const pathname = usePathname();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-10'>
      {data.map((item) => (
        <div
          key={item.id}
          className='relative group cursor-zoom-in rounded-lg overflow-hidden'
          style={{ aspectRatio: `${item.width} / ${item.height}` }}
        >
          <Link href={`${pathname}/${item.id}`}>
            <Image
              src={item.urls.regular}
              fill
              style={{ objectFit: 'cover' }}
              sizes='(max-width: 400px) 200px,
                       (max-width: 1080px) 500px,
                       1080px'
              alt={item.id}
            />
          </Link>
          <div
            className={cn(
              'absolute inset-0 bg-[rgba(0,0,0,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
            )}
          >
            <div className='absolute top-4 right-4 flex gap-2.5 pointer-events-auto'>
              <button title='이 이미지에 좋아요 표시'>
                <Heart size='32' className='image-cover-icon' />
              </button>
              <button title='이 이미지를 컬렉션에 추가'>
                <Plus size='32' className='image-cover-icon' />
              </button>
            </div>
            <DownloadButton
              downloadUrl={item.urls.regular}
              filename={item.id}
              className='absolute bottom-4 right-4'
            >
              <Download size='32' className='image-cover-icon' />
            </DownloadButton>
          </div>
        </div>
      ))}
      <div ref={loaderRef}></div>
    </div>
  );
}

interface ButtonProps {
  downloadUrl: string;
  filename: string;
  children?: React.ReactNode;
  className?: string;
}

function DownloadButton(props: ButtonProps) {
  const { downloadUrl, filename, children, className } = props;
  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const image = await fetch(downloadUrl);
    const blob = await image.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  };
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
