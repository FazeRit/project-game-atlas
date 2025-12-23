/*
  Warnings:

  - You are about to drop the `otps` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "otps" DROP CONSTRAINT "otps_user_id_fkey";

-- DropTable
DROP TABLE "otps";
