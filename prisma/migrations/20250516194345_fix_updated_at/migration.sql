/*
  Warnings:

  - Added the required column `updatedAt` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tasks_priority_date_completed_idx";

-- DropIndex
DROP INDEX "tasks_userId_idx";

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
