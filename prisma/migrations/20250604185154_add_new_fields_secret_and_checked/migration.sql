/*
  Warnings:

  - Added the required column `secret` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `checked` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `secret` VARCHAR(191) NOT NULL;
