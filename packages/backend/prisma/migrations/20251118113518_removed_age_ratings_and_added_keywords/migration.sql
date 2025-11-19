/*
  Warnings:

  - You are about to drop the `age_rating_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `age_ratings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `game_age_ratings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "age_ratings" DROP CONSTRAINT "age_ratings_rating_category_id_fkey";

-- DropForeignKey
ALTER TABLE "game_age_ratings" DROP CONSTRAINT "game_age_ratings_age_rating_id_fkey";

-- DropForeignKey
ALTER TABLE "game_age_ratings" DROP CONSTRAINT "game_age_ratings_game_id_fkey";

-- DropTable
DROP TABLE "age_rating_categories";

-- DropTable
DROP TABLE "age_ratings";

-- DropTable
DROP TABLE "game_age_ratings";

-- CreateTable
CREATE TABLE "game_keywords" (
    "checksum" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "keyword_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_keywords_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "keywords" (
    "checksum" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "url" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("checksum")
);

-- AddForeignKey
ALTER TABLE "game_keywords" ADD CONSTRAINT "game_keywords_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_keywords" ADD CONSTRAINT "game_keywords_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "keywords"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;
