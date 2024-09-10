'use client';

import { Check, Minus, Plus } from 'lucide-react';
import { AlertDialogDescription, AlertDialogTitle } from '../ui/alert-dialog';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import {
  createNewCollection,
  toggleCollection,
} from '@/actions/handleCollection';
import { CollectionWithPhotos } from '@/types';
import { useDebounce } from '@/lib/useDebounce';

const formSchema = z.object({
  title: z.string({
    required_error: '필수 입력값입니다.',
    invalid_type_error: '문자만 입력가능 합니다.',
  }),
  description: z.string().optional(),
});

export default function CollectionsModal({
  selectedPhoto,
  session,
  collections,
}: {
  selectedPhoto: any;
  session: any;
  collections: CollectionWithPhotos[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isCreating, setIsCreating] = useState(false);
  const [userCollections, setUserCollections] = useState(collections);

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const { title, description } = value;
    const newCollection = await createNewCollection(
      session.user.id,
      selectedPhoto.id,
      title,
      description
    );
    setUserCollections((prevCollections) => [
      ...prevCollections,
      newCollection,
    ]);
    setIsCreating(false);
  };

  const isPhotoInCollection = (collection: CollectionWithPhotos) => {
    console.log(collection);
    return collection.photos.some((photo) => photo.id === selectedPhoto.id);
  };

  const updateCollectionOnServer = useDebounce(async (collectionId: string) => {
    try {
      await toggleCollection(collectionId, selectedPhoto.id);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const handleToggelCollection = (collectionId: string) => {
    setUserCollections((prevCollections) =>
      prevCollections.map((collection) => {
        // console.log('check toggle state => ', isPhotoInCollection(collection));
        // console.log(
        //   'handle toggle collection => ',
        //   prevCollections,
        //   collection
        // );
        if (collection.id === collectionId) {
          return {
            ...collection,
            photos: isPhotoInCollection(collection)
              ? collection.photos.filter(
                  (photo) => photo.id !== selectedPhoto.id
                )
              : [...collection.photos, selectedPhoto],
          };
        }
        return collection;
      })
    );
    updateCollectionOnServer(collectionId);
  };

  return (
    <>
      {/* 선택 이미지 */}
      <div className='relative h-full'>
        <Image
          src={selectedPhoto.urls.small}
          alt={selectedPhoto.alt_description || selectedPhoto.id}
          fill
        />
      </div>
      <div className='flex flex-col gap-3 w-full h-full p-5 pl-6 sm:font-bold overflow-y-auto'>
        {isCreating ? (
          <>
            {/* 컬렉션 생성 form */}
            <AlertDialogTitle className='sm:font-bold sm:text-3xl'>
              새 컬렉션 추가
            </AlertDialogTitle>
            <AlertDialogDescription className='hidden'>
              자신만의 컬렉션을 만들어 보세요.
            </AlertDialogDescription>
            <Form {...form}>
              <form
                className='mt-8 space-y-6'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name='title'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='아름다운 사진'
                          className='border-2'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='description'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>설명(옵션)</FormLabel>
                      <FormControl>
                        <Textarea {...field} className='resize-none border-2' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex justify-between'>
                  <Button
                    onClick={() => setIsCreating((prev) => !prev)}
                    className='bg-transparent text-gray-500 hover:bg-transparent'
                  >
                    취소
                  </Button>
                  <Button type='submit'>컬렉션 생성</Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <>
            {/* 컬렉션 리스트 & 컬렉션 생성 UI */}
            <AlertDialogTitle className='sm:font-bold sm:text-3xl'>
              컬렉션 생성
            </AlertDialogTitle>
            <AlertDialogDescription className='hidden'>
              자신만의 컬렉션을 만들어 보세요.
            </AlertDialogDescription>
            <div
              className='flex justify-between min-h-16 items-center border-dashed border-2 border-slate-400 p-2 pl-3 rounded-lg sm:text-2xl text-slate-400 cursor-pointer mt-8'
              onClick={() => setIsCreating((prev) => !prev)}
            >
              새 컬렉션 생성
              <Plus />
            </div>
            {userCollections.map((collection) => (
              <div
                key={collection.id}
                className='relative group flex justify-between min-h-20 items-center p-4 px-7 rounded-lg sm:text-2xl text-white cursor-pointer mt-8 overflow-hidden'
                onClick={() => handleToggelCollection(collection.id)}
              >
                {/* 컬렉션 대표 이미지 */}
                {collection.photos.at(-1)?.urls && (
                  <Image
                    alt={collection.id}
                    src={collection.photos.at(-1)?.urls.regular}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                )}
                {/* 반투명 오버레이 */}
                <div className='absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-lg pointer-events-none p-4'></div>
                {/* 컬렉션 타이틀 */}
                <div className='z-10'>
                  <span className='text-xs block'>
                    사진 {collection.photos.length}장
                  </span>
                  <span>{collection.title}</span>
                </div>
                {/* 컬렉션 토글 아이콘 */}
                {isPhotoInCollection(collection) && (
                  <Check className='group-hover:hidden z-10' />
                )}
                {isPhotoInCollection(collection) ? (
                  <Minus className='hidden group-hover:block z-10' />
                ) : (
                  <Plus className='hidden group-hover:block z-10' />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
