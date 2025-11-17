-- CreateTable
CREATE TABLE "games" (
    "checksum" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT,
    "storyline" TEXT,
    "total_rating" DOUBLE PRECISION,
    "total_rating_count" INTEGER,
    "url" TEXT,
    "first_release_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "game_age_ratings" (
    "checksum" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "age_rating_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_age_ratings_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "age_ratings" (
    "checksum" TEXT NOT NULL,
    "rating_category_id" TEXT NOT NULL,
    "rating_cover_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "age_ratings_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "age_rating_categories" (
    "checksum" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "age_rating_categories_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "game_companies" (
    "checksum" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "developer" BOOLEAN NOT NULL,
    "publisher" BOOLEAN NOT NULL,
    "supporting" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_companies_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "companies" (
    "checksum" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "country" INTEGER,
    "start_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "covers" (
    "checksum" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "height" INTEGER,
    "width" INTEGER,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "covers_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "screenshots" (
    "checksum" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "height" INTEGER,
    "width" INTEGER,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "screenshots_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "game_genres" (
    "checksum" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_genres_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "genres" (
    "checksum" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "users" (
    "checksum" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "personal_notes" (
    "checksum" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personal_notes_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "game_platforms" (
    "checksum" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "platform_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_platforms_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "platforms" (
    "checksum" TEXT NOT NULL,
    "platform_logo_id" TEXT NOT NULL,
    "platform_type_id" TEXT NOT NULL,
    "abbreviation" TEXT,
    "name" TEXT NOT NULL,
    "alternative_name" TEXT NOT NULL,
    "summary" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platforms_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "platform_logos" (
    "checksum" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "height" INTEGER,
    "width" INTEGER,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_logos_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "platform_types" (
    "checksum" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_types_pkey" PRIMARY KEY ("checksum")
);

-- CreateIndex
CREATE UNIQUE INDEX "age_ratings_rating_category_id_key" ON "age_ratings"("rating_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "covers_game_id_key" ON "covers"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "platforms_platform_logo_id_key" ON "platforms"("platform_logo_id");

-- CreateIndex
CREATE UNIQUE INDEX "platforms_platform_type_id_key" ON "platforms"("platform_type_id");

-- AddForeignKey
ALTER TABLE "game_age_ratings" ADD CONSTRAINT "game_age_ratings_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_age_ratings" ADD CONSTRAINT "game_age_ratings_age_rating_id_fkey" FOREIGN KEY ("age_rating_id") REFERENCES "age_ratings"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "age_ratings" ADD CONSTRAINT "age_ratings_rating_category_id_fkey" FOREIGN KEY ("rating_category_id") REFERENCES "age_rating_categories"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_companies" ADD CONSTRAINT "game_companies_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_companies" ADD CONSTRAINT "game_companies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "covers" ADD CONSTRAINT "covers_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "screenshots" ADD CONSTRAINT "screenshots_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_genres" ADD CONSTRAINT "game_genres_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_genres" ADD CONSTRAINT "game_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_notes" ADD CONSTRAINT "personal_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_notes" ADD CONSTRAINT "personal_notes_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_platforms" ADD CONSTRAINT "game_platforms_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_platforms" ADD CONSTRAINT "game_platforms_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platforms"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platforms" ADD CONSTRAINT "platforms_platform_logo_id_fkey" FOREIGN KEY ("platform_logo_id") REFERENCES "platform_logos"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platforms" ADD CONSTRAINT "platforms_platform_type_id_fkey" FOREIGN KEY ("platform_type_id") REFERENCES "platform_types"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;
