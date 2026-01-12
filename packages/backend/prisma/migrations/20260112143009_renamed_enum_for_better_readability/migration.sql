/*
  Warnings:

  - Changed the type of `side` on the `game_battle_votes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EBattleVoteSide" AS ENUM ('A', 'B');

-- AlterTable
ALTER TABLE "game_battle_votes" DROP COLUMN "side",
ADD COLUMN     "side" "EBattleVoteSide" NOT NULL;

-- DropEnum
DROP TYPE "EVoteSide";
