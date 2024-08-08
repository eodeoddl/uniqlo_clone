'use server';

import { db } from '@/lib/db';

export default async function clickLike(photoId: string, userId: string) {
  const photo = await db.photo.findUnique({
    where: { id: photoId },
    select: { liked_by_user: true, likes: true },
  });

  if (!photo) {
    throw new Error('Photo not found');
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { likedPhotos: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // 좋아요 상태 토글
  const newLikedByUser = !photo.liked_by_user;
  const newLikes = newLikedByUser ? photo.likes + 1 : photo.likes - 1;

  // likedPhotos 배열
  const updatedLikedPhotos = newLikedByUser
    ? [...user.likedPhotos, photoId]
    : user.likedPhotos.filter((id) => id !== photoId);

  // 데이터베이스 업데이트
  await db.photo.update({
    where: { id: photoId },
    data: {
      liked_by_user: newLikedByUser,
      likes: newLikes,
    },
    select: { id: true },
  });

  await db.user.update({
    where: { id: userId },
    data: { likedPhotos: updatedLikedPhotos },
  });
}
