/*
  Warnings:

  - The primary key for the `Photo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `blurHash` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `likedByUser` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `unsplash_id` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the `Links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Urls` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `alternative_slugs` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `downloads` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liked_by_user` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `links` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urls` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "PhotoToLinks";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "PhotoToUrls";

-- AlterTable
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_pkey",
DROP COLUMN "blurHash",
DROP COLUMN "color",
DROP COLUMN "likedByUser",
DROP COLUMN "topic",
DROP COLUMN "unsplash_id",
ADD COLUMN     "alt_description" TEXT,
ADD COLUMN     "alternative_slugs" JSONB NOT NULL,
ADD COLUMN     "downloads" INTEGER NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "liked_by_user" BOOLEAN NOT NULL,
ADD COLUMN     "links" JSONB NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "urls" JSONB NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL,
ADD CONSTRAINT "Photo_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Links";

-- DropTable
DROP TABLE "Urls";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagPreview" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,

    CONSTRAINT "TagPreview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagOnPhotos" (
    "id" SERIAL NOT NULL,
    "photoId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "TagOnPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicOnPhotos" (
    "id" SERIAL NOT NULL,
    "photoId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    CONSTRAINT "TopicOnPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_title_key" ON "Tag"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");

-- AddForeignKey
ALTER TABLE "TagPreview" ADD CONSTRAINT "TagPreview_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnPhotos" ADD CONSTRAINT "TagOnPhotos_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnPhotos" ADD CONSTRAINT "TagOnPhotos_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicOnPhotos" ADD CONSTRAINT "TopicOnPhotos_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicOnPhotos" ADD CONSTRAINT "TopicOnPhotos_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
