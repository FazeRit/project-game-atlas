-- AlterTable
ALTER TABLE "users" ADD COLUMN     "last_accessed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "companies_slug_idx" ON "companies"("slug");

-- CreateIndex
CREATE INDEX "game_companies_game_id_idx" ON "game_companies"("game_id");

-- CreateIndex
CREATE INDEX "game_companies_company_id_idx" ON "game_companies"("company_id");

-- CreateIndex
CREATE INDEX "game_genres_game_id_idx" ON "game_genres"("game_id");

-- CreateIndex
CREATE INDEX "game_genres_genre_id_idx" ON "game_genres"("genre_id");

-- CreateIndex
CREATE INDEX "game_keywords_game_id_idx" ON "game_keywords"("game_id");

-- CreateIndex
CREATE INDEX "game_keywords_keyword_id_idx" ON "game_keywords"("keyword_id");

-- CreateIndex
CREATE INDEX "games_name_idx" ON "games"("name");

-- CreateIndex
CREATE INDEX "genres_slug_idx" ON "genres"("slug");

-- CreateIndex
CREATE INDEX "keywords_slug_idx" ON "keywords"("slug");

-- CreateIndex
CREATE INDEX "otps_user_id_idx" ON "otps"("user_id");

-- CreateIndex
CREATE INDEX "personal_library_games_personal_library_id_idx" ON "personal_library_games"("personal_library_id");

-- CreateIndex
CREATE INDEX "personal_library_games_game_id_idx" ON "personal_library_games"("game_id");

-- CreateIndex
CREATE INDEX "screenshots_game_id_idx" ON "screenshots"("game_id");
