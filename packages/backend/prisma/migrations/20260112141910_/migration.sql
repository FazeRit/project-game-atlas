-- CreateEnum
CREATE TYPE "EVoteSide" AS ENUM ('A', 'B');

-- CreateTable
CREATE TABLE "game_battles" (
    "checksum" TEXT NOT NULL,
    "game_A_id" TEXT NOT NULL,
    "game_B_id" TEXT NOT NULL,
    "votes_A" INTEGER NOT NULL DEFAULT 0,
    "votes_B" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "ends_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_battles_pkey" PRIMARY KEY ("checksum")
);

-- CreateTable
CREATE TABLE "game_battle_votes" (
    "checksum" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "battle_id" TEXT NOT NULL,
    "side" "EVoteSide" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_battle_votes_pkey" PRIMARY KEY ("checksum")
);

-- CreateIndex
CREATE INDEX "game_battles_is_active_idx" ON "game_battles"("is_active");

-- CreateIndex
CREATE INDEX "game_battles_ends_at_idx" ON "game_battles"("ends_at");

-- CreateIndex
CREATE INDEX "game_battle_votes_battle_id_idx" ON "game_battle_votes"("battle_id");

-- CreateIndex
CREATE INDEX "game_battle_votes_user_id_idx" ON "game_battle_votes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "game_battle_votes_user_id_battle_id_key" ON "game_battle_votes"("user_id", "battle_id");

-- AddForeignKey
ALTER TABLE "game_battle_votes" ADD CONSTRAINT "game_battle_votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_battle_votes" ADD CONSTRAINT "game_battle_votes_battle_id_fkey" FOREIGN KEY ("battle_id") REFERENCES "game_battles"("checksum") ON DELETE CASCADE ON UPDATE CASCADE;
