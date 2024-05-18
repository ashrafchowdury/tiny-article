/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `authorId` on table `Bookmark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `Prompt` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_authorId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Prompt" ALTER COLUMN "authorId" SET NOT NULL;

-- DropTable
DROP TABLE "User";
