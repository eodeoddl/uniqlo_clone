'use client';

import { useForm } from 'react-hook-form';
import { AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { deleteCollection, editCollection } from '@/actions/handleCollection';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

const formSchema = z.object({
  title: z.string({
    required_error: '필수 입력값입니다.',
    invalid_type_error: '문자만 입력가능 합니다.',
  }),
  description: z.string().optional(),
});

type ModalProps = {
  title: string;
  description?: string;
  collectionId: string;
};

export default function CollectionEditModal({
  title,
  description = '',
  collectionId,
}: ModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      description,
    },
  });
  const { isSubmitting } = form.formState;
  const [actionType, setActionType] = useState<'delete' | 'save'>('save');
  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const { title, description } = value;
    if (actionType === 'delete') {
      await deleteCollection(collectionId);
    } else {
      await editCollection(collectionId, title, description);
    }
    router.replace('/account/profile/collections');
    router.refresh();
  };

  return (
    <>
      <div className='flex justify-between items-center mt-10'>
        <AlertDialogTitle className='sm:font-bold sm:text-3xl'>
          컬렉션 편집
        </AlertDialogTitle>
        <AlertDialogTrigger>
          <X />
        </AlertDialogTrigger>
      </div>
      <Form {...form}>
        <form className='mt-8 space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name='title'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input {...field} className='border-2' />
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
            {actionType === 'save' ? (
              <Button
                onClick={() => setActionType('delete')}
                className='bg-transparent text-red-500 underline hover:bg-transparent'
                disabled={isSubmitting}
              >
                컬렉션 삭제하기
              </Button>
            ) : (
              <div className='flex items-center'>
                <span>삭제 하시겠습니까?</span>
                <Button
                  className='bg-transparent underline text-black hover:bg-transparent'
                  onClick={() => setActionType('save')}
                  disabled={isSubmitting}
                >
                  취소
                </Button>
              </div>
            )}
            <Button
              type='submit'
              className={cn({
                'bg-red-500 hover:bg-red-400': actionType === 'delete',
              })}
              disabled={isSubmitting}
            >
              {actionType === 'save' ? '컬렉션 저장' : '삭제'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
