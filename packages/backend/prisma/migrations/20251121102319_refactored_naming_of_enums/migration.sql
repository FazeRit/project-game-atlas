/*
  Warnings:

  - The `status` column on the `personal_library_games` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rank` column on the `personal_library_games` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EPlayStatus" AS ENUM ('PREFERENCE', 'PLAYING', 'COMPLETED', 'DROPPED', 'ON_HOLD', 'BACKLOG');

-- CreateEnum
CREATE TYPE "ETierRank" AS ENUM ('S', 'A', 'B', 'C', 'D', 'F', 'UNRANKED');

-- CreateEnum
CREATE TYPE "ERecommendationReason" AS ENUM ('ANTI_BURNOUT', 'BLIND_SPOT', 'HIGH_COMPATIBILITY', 'BACKLOG_REMINDER');

-- CreateEnum
CREATE TYPE "EPredictionVerdict" AS ENUM ('EXCELLENT', 'GOOD', 'RISKY');

-- AlterTable
ALTER TABLE "personal_library_games" DROP COLUMN "status",
ADD COLUMN     "status" "EPlayStatus" NOT NULL DEFAULT 'BACKLOG',
DROP COLUMN "rank",
ADD COLUMN     "rank" "ETierRank" NOT NULL DEFAULT 'UNRANKED';

-- DropEnum
DROP TYPE "PlayStatus";

-- DropEnum
DROP TYPE "PredictionVerdict";

-- DropEnum
DROP TYPE "RecommendationReason";

-- DropEnum
DROP TYPE "TierRank";
