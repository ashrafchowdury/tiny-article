/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Prompt` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Prompt_authorId_key" ON "Prompt"("authorId");
