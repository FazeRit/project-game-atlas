/*
  Warnings:

  - You are about to drop the column `platform_logo_id` on the `platforms` table. All the data in the column will be lost.
  - You are about to drop the `platform_logos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "platforms" DROP CONSTRAINT "platforms_platform_logo_id_fkey";

-- DropIndex
DROP INDEX "platforms_platform_logo_id_key";

-- AlterTable
ALTER TABLE "platforms" DROP COLUMN "platform_logo_id";

-- DropTable
DROP TABLE "platform_logos";
