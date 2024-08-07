/*
  Warnings:

  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('RESISTER', 'RESET_PASSWORD');

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "Verification" (
    "token" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "expires_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Photo" (
    "unsplash_id" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "color" TEXT,
    "blurHash" TEXT,
    "likes" INTEGER NOT NULL,
    "likedByUser" BOOLEAN NOT NULL,
    "description" TEXT,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("unsplash_id")
);

-- CreateTable
CREATE TABLE "Urls" (
    "unsplash_id" TEXT NOT NULL,
    "raw" TEXT NOT NULL,
    "full" TEXT NOT NULL,
    "regular" TEXT NOT NULL,
    "small" TEXT NOT NULL,
    "thumb" TEXT NOT NULL,

    CONSTRAINT "Urls_pkey" PRIMARY KEY ("unsplash_id")
);

-- CreateTable
CREATE TABLE "Links" (
    "unsplash_id" TEXT NOT NULL,
    "self" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "download" TEXT NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("unsplash_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Verification_token_key" ON "Verification"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_email_key" ON "Verification"("email");

-- AddForeignKey
ALTER TABLE "Urls" ADD CONSTRAINT "Urls_unsplash_id_fkey" FOREIGN KEY ("unsplash_id") REFERENCES "Photo"("unsplash_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_unsplash_id_fkey" FOREIGN KEY ("unsplash_id") REFERENCES "Photo"("unsplash_id") ON DELETE RESTRICT ON UPDATE CASCADE;
