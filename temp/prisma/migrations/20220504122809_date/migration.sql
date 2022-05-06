/*
  Warnings:

  - You are about to alter the column `finish_at` on the `timeline` table. The data in that column could be lost. The data in that column will be cast from `VarChar(128)` to `DateTime(3)`.
  - Added the required column `updated_at` to the `timeline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `timeline` ADD COLUMN `cretated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `finish_at` DATETIME(3) NOT NULL;
