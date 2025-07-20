/*
  Warnings:

  - Added the required column `phone` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL;
