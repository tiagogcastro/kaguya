/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `suggestions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "suggestions_slug_key" ON "suggestions"("slug");
