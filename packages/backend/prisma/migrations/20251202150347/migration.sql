/*
  Warnings:

  - The values [BACKLOG_REMINDER] on the enum `ERecommendationReason` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ERecommendationReason_new" AS ENUM ('ANTI_BURNOUT', 'BLIND_SPOT', 'HIGH_COMPATIBILITY');
ALTER TYPE "ERecommendationReason" RENAME TO "ERecommendationReason_old";
ALTER TYPE "ERecommendationReason_new" RENAME TO "ERecommendationReason";
DROP TYPE "public"."ERecommendationReason_old";
COMMIT;
