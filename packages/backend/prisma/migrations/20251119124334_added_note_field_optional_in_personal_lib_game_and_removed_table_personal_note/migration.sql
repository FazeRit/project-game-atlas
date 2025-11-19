/*
  Warnings:

  - You are about to drop the `personal_notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "personal_notes" DROP CONSTRAINT "personal_notes_game_id_fkey";

-- DropForeignKey
ALTER TABLE "personal_notes" DROP CONSTRAINT "personal_notes_user_id_fkey";

-- AlterTable
ALTER TABLE "personal_library_games" ADD COLUMN     "note" TEXT;

-- DropTable
DROP TABLE "personal_notes";
