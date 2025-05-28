/*
  Warnings:

  - The values [BAIXA,MÉDIA,ALTA] on the enum `Priority` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Priority_new" AS ENUM ('baixa', 'média', 'alta');
ALTER TABLE "tasks" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TYPE "Priority" RENAME TO "Priority_old";
ALTER TYPE "Priority_new" RENAME TO "Priority";
DROP TYPE "Priority_old";
COMMIT;
