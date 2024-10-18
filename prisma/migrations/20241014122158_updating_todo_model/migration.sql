/*
  Warnings:

  - You are about to drop the column `isDone` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `difficultyLevel` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `importanceLevel` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "isDone",
ADD COLUMN     "days" TEXT[],
ADD COLUMN     "difficultyLevel" INTEGER NOT NULL,
ADD COLUMN     "importanceLevel" INTEGER NOT NULL,
ADD COLUMN     "isAchieved" BOOLEAN NOT NULL DEFAULT false;
