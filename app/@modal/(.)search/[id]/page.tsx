import { fetchById, getTagsAndTopicsByPhotoId } from '@/data/photo';

import PhotoModal from '@/components/photo/photoModal';
import { auth } from '@/auth';

export default async function Modal({ params }: { params: { id: string } }) {
  const photo = await fetchById(params.id);
  const tagsAndTopics = await getTagsAndTopicsByPhotoId(params.id);
  const session = await auth();

  return (
    <PhotoModal photo={photo} tagsAndTopics={tagsAndTopics} session={session} />
  );
}
