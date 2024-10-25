'use server';

import { db } from '@/lib/db';
import { ImageType, PhotoGridFetchFunction } from '@/types';
import { revalidatePath } from 'next/cache';

export const toggleLike = async (userId: string, photoId: string) => {
  const existingLike = await db.userPhotoLikes.findUnique({
    where: {
      userId_photoId: {
        userId: userId,
        photoId: photoId,
      },
    },
  });

  if (existingLike) {
    // 이미 좋아요한 경우 -> 좋아요 취소
    await db.userPhotoLikes.delete({
      where: {
        userId_photoId: {
          userId: userId,
          photoId: photoId,
        },
      },
    });
  } else {
    // 좋아요하지 않은 경우 -> 좋아요 추가
    await db.userPhotoLikes.create({
      data: {
        userId: userId,
        photoId: photoId,
      },
    });
  }

  revalidatePath('/account/profile/likes');
};

export const getLikedByUserPhotos: PhotoGridFetchFunction<string> = async (
  userId: string,
  skip = 0,
  take = 10
) => {
  console.log('server action user Id => ', userId);
  const photos = await db.userPhotoLikes.findMany({
    where: {
      userId,
    },
    select: {
      photo: true,
    },
    skip,
    take,
  });

  const likedPhotos = photos.map((photo) => ({
    ...photo.photo,
    liked_by_user: true,
  }));

  return likedPhotos as ImageType[];
};
