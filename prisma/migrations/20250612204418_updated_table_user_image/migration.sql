/*
  Warnings:

  - You are about to drop the column `mediaId` on the `image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_mediaId_fkey`;

-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `media_userId_fkey`;

-- DropIndex
DROP INDEX `Image_mediaId_fkey` ON `image`;

-- DropIndex
DROP INDEX `media_userId_fkey` ON `media`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `mediaId`,
    MODIFY `phone` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_phone_fkey` FOREIGN KEY (`phone`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
