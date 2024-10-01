-- CreateTable
CREATE TABLE "UserPhotoLikes" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,

    CONSTRAINT "UserPhotoLikes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPhotoLikes_userId_photoId_key" ON "UserPhotoLikes"("userId", "photoId");

-- AddForeignKey
ALTER TABLE "UserPhotoLikes" ADD CONSTRAINT "UserPhotoLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPhotoLikes" ADD CONSTRAINT "UserPhotoLikes_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
