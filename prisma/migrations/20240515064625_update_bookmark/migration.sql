/*
  Warnings:

  - The `content` column on the `Bookmark` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "hashtags" TEXT[],
DROP COLUMN "content",
ADD COLUMN     "content" TEXT[];
