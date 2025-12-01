/*
  Warnings:

  - The values [S,F] on the enum `ETierRank` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ETierRank_new" AS ENUM ('A', 'B', 'C', 'D', 'UNRANKED');
ALTER TABLE "public"."personal_library_games" ALTER COLUMN "rank" DROP DEFAULT;
ALTER TABLE "personal_library_games" ALTER COLUMN "rank" TYPE "ETierRank_new" USING ("rank"::text::"ETierRank_new");
ALTER TYPE "ETierRank" RENAME TO "ETierRank_old";
ALTER TYPE "ETierRank_new" RENAME TO "ETierRank";
DROP TYPE "public"."ETierRank_old";
ALTER TABLE "personal_library_games" ALTER COLUMN "rank" SET DEFAULT 'UNRANKED';
COMMIT;
