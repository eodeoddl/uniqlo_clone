-- AlterTable
ALTER TABLE "User" ADD COLUMN     "likedPhotos" TEXT[] DEFAULT ARRAY[]::TEXT[];
