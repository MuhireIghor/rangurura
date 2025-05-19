/*
  Warnings:

  - The values [IN_PROGRESS,REJECTED] on the enum `ComplaintStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `finalStatus` on the `Complaint` table. All the data in the column will be lost.
  - You are about to drop the column `firstLevel` on the `Complaint` table. All the data in the column will be lost.
  - You are about to drop the column `secondLevel` on the `Complaint` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ComplaintLevel" AS ENUM ('LEVEL_1', 'LEVEL_2');

-- AlterEnum
BEGIN;
CREATE TYPE "ComplaintStatus_new" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'RESPONDED', 'ESCALATED', 'RESOLVED');
ALTER TABLE "Complaint" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Complaint" ALTER COLUMN "status" TYPE "ComplaintStatus_new" USING ("status"::text::"ComplaintStatus_new");
ALTER TYPE "ComplaintStatus" RENAME TO "ComplaintStatus_old";
ALTER TYPE "ComplaintStatus_new" RENAME TO "ComplaintStatus";
DROP TYPE "ComplaintStatus_old";
ALTER TABLE "Complaint" ALTER COLUMN "status" SET DEFAULT 'SUBMITTED';
COMMIT;

-- AlterTable
ALTER TABLE "Complaint" DROP COLUMN "finalStatus",
DROP COLUMN "firstLevel",
DROP COLUMN "secondLevel",
ADD COLUMN     "currentLevel" "ComplaintLevel" NOT NULL DEFAULT 'LEVEL_1';
