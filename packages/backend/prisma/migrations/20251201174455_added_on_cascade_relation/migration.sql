-- DropForeignKey
ALTER TABLE "covers" DROP CONSTRAINT "covers_game_id_fkey";

-- DropForeignKey
ALTER TABLE "game_companies" DROP CONSTRAINT "game_companies_company_id_fkey";

-- DropForeignKey
ALTER TABLE "game_companies" DROP CONSTRAINT "game_companies_game_id_fkey";

-- DropForeignKey
ALTER TABLE "game_genres" DROP CONSTRAINT "game_genres_game_id_fkey";

-- DropForeignKey
ALTER TABLE "game_genres" DROP CONSTRAINT "game_genres_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "game_keywords" DROP CONSTRAINT "game_keywords_game_id_fkey";

-- DropForeignKey
ALTER TABLE "game_keywords" DROP CONSTRAINT "game_keywords_keyword_id_fkey";

-- DropForeignKey
ALTER TABLE "otps" DROP CONSTRAINT "otps_user_id_fkey";

-- DropForeignKey
ALTER TABLE "personal_libraries" DROP CONSTRAINT "personal_libraries_user_id_fkey";

-- DropForeignKey
ALTER TABLE "personal_library_games" DROP CONSTRAINT "personal_library_games_game_id_fkey";

-- DropForeignKey
ALTER TABLE "personal_library_games" DROP CONSTRAINT "personal_library_games_personal_library_id_fkey";

-- DropForeignKey
ALTER TABLE "screenshots" DROP CONSTRAINT "screenshots_game_id_fkey";

-- AddForeignKey
ALTER TABLE "game_keywords" ADD CONSTRAINT "game_keywords_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_keywords" ADD CONSTRAINT "game_keywords_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "keywords"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_companies" ADD CONSTRAINT "game_companies_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_companies" ADD CONSTRAINT "game_companies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "covers" ADD CONSTRAINT "covers_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "screenshots" ADD CONSTRAINT "screenshots_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_genres" ADD CONSTRAINT "game_genres_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_genres" ADD CONSTRAINT "game_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "otps" ADD CONSTRAINT "otps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_library_games" ADD CONSTRAINT "personal_library_games_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_library_games" ADD CONSTRAINT "personal_library_games_personal_library_id_fkey" FOREIGN KEY ("personal_library_id") REFERENCES "personal_libraries"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_libraries" ADD CONSTRAINT "personal_libraries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;
