'use server';

import { ImageType, PhotoGridFetchFunction } from '@/types';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const toggleLikeBatch = async (userId: string, photoIds: string[]) => {
  if (!photoIds.length) return;
  // 이미 좋아요 눌린 것 조회 (한번에)
  const existing = await db.userPhotoLikes.findMany({
    where: {
      userId,
      photoId: { in: photoIds },
    },
    select: { photoId: true },
  });

  const likedSet = new Set(existing.map((e) => e.photoId));

  const toDelete = photoIds.filter((id) => likedSet.has(id));
  const toCreate = photoIds.filter((id) => !likedSet.has(id));

  await db.$transaction([
    // unlike
    ...toDelete.map((photoId) =>
      db.userPhotoLikes.delete({
        where: {
          userId_photoId: { userId, photoId },
        },
      }),
    ),
    // like
    ...toCreate.map((photoId) =>
      db.userPhotoLikes.create({
        data: { userId, photoId },
      }),
    ),
  ]);

  revalidatePath('/account/profile/likes');
};

export const handlePhotoLike = async (photoId: string[]) => {
  const session = await auth();
  if (!session) return;
  await toggleLikeBatch(session.user.id, photoId);
};

export const getLikedByUserPhotos: PhotoGridFetchFunction<string> = async (
  userId: string,
  skip = 0,
  take = 10,
) => {
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
