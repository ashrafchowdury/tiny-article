/*
  Warnings:

  - You are about to drop the column `prompt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "prompt";

-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "prompt" TEXT,
    "voice" TEXT NOT NULL DEFAULT 'netural',
    "isFormatPost" BOOLEAN NOT NULL DEFAULT true,
    "isEmoji" BOOLEAN NOT NULL DEFAULT false,
    "isHashtag" BOOLEAN NOT NULL DEFAULT false,
    "isAutoSavePost" BOOLEAN NOT NULL DEFAULT true,
    "authorId" TEXT,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
