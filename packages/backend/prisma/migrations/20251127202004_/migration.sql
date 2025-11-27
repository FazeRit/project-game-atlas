/*
  Warnings:

  - You are about to drop the `game_platforms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `platform_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `platforms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "game_platforms" DROP CONSTRAINT "game_platforms_game_id_fkey";

-- DropForeignKey
ALTER TABLE "game_platforms" DROP CONSTRAINT "game_platforms_platform_id_fkey";

-- DropForeignKey
ALTER TABLE "platforms" DROP CONSTRAINT "platforms_platform_type_id_fkey";

-- DropTable
DROP TABLE "game_platforms";

-- DropTable
DROP TABLE "platform_types";

-- DropTable
DROP TABLE "platforms";
