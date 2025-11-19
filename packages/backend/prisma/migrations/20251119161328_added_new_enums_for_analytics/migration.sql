-- CreateEnum
CREATE TYPE "RecommendationReason" AS ENUM ('ANTI_BURNOUT', 'BLIND_SPOT', 'HIGH_COMPATIBILITY', 'BACKLOG_REMINDER');

-- CreateEnum
CREATE TYPE "PredictionVerdict" AS ENUM ('EXCELLENT', 'GOOD', 'RISKY');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "taste_vector" JSONB DEFAULT '{}';
