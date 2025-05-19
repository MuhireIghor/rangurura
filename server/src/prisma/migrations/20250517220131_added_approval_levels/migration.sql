-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('APPROVED', 'PENDING', 'REJECTED', 'AUTOREJECTED');

-- AlterTable
ALTER TABLE "Complaint" ADD COLUMN     "finalStatus" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "firstLevel" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "secondLevel" "ApprovalStatus" NOT NULL DEFAULT 'PENDING';
