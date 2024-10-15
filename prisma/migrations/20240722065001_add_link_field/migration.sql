/*
  Warnings:

  - Added the required column `download_location` to the `Links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Links" ADD COLUMN     "download_location" TEXT NOT NULL;
