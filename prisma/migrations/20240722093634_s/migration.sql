-- DropForeignKey
ALTER TABLE "Links" DROP CONSTRAINT "Links_unsplash_id_fkey";

-- DropForeignKey
ALTER TABLE "Urls" DROP CONSTRAINT "Urls_unsplash_id_fkey";

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "PhotoToUrls" FOREIGN KEY ("unsplash_id") REFERENCES "Urls"("unsplash_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "PhotoToLinks" FOREIGN KEY ("unsplash_id") REFERENCES "Links"("unsplash_id") ON DELETE RESTRICT ON UPDATE CASCADE;
