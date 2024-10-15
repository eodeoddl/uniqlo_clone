-- AddForeignKey
ALTER TABLE "CollectionOnPhotos" ADD CONSTRAINT "CollectionOnPhotos_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
