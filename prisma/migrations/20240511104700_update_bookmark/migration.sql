/*
  Warnings:

  - You are about to drop the column `bookmarkedAt` on the `Bookmark` table. All the data in the column will be lost.
  - Made the column `content` on table `Bookmark` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "bookmarkedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "content" SET NOT NULL;
