import { fetchById, getTagsAndTopicsByPhotoId } from '@/data/photo';

import PhotoModal from '@/components/photo/photoModal';

export default async function Modal({ params }: { params: { id: string } }) {
  const photo = await fetchById(params.id);
  const tagsAndTopics = await getTagsAndTopicsByPhotoId(params.id);

  return <PhotoModal photo={photo} tagsAndTopics={tagsAndTopics} />;
}
