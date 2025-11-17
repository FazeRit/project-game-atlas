-- CreateEnum
CREATE TYPE "PlayStatus" AS ENUM ('PLAYING', 'COMPLETED', 'DROPPED', 'ON_HOLD', 'BACKLOG');

-- CreateEnum
CREATE TYPE "TierRank" AS ENUM ('S', 'A', 'B', 'C', 'D', 'F', 'UNRANKED');

-- CreateTable
CREATE TABLE "personal_library_games" (
    "checksum" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "personal_library_id" TEXT NOT NULL,
    "status" "PlayStatus" NOT NULL DEFAULT 'BACKLOG',
    "rank" "TierRank" NOT NULL DEFAULT 'UNRANKED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personal_library_games_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "personal_libraries" (
    "checksum" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personal_libraries_pkey" PRIMARY KEY ("checksum")
);

-- CreateIndex
CREATE UNIQUE INDEX "personal_libraries_user_id_key" ON "personal_libraries"("user_id");

-- AddForeignKey
ALTER TABLE "personal_library_games" ADD CONSTRAINT "personal_library_games_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_library_games" ADD CONSTRAINT "personal_library_games_personal_library_id_fkey" FOREIGN KEY ("personal_library_id") REFERENCES "personal_libraries"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_libraries" ADD CONSTRAINT "personal_libraries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("checksum") ON DELETE RESTRICT ON UPDATE CASCADE;
