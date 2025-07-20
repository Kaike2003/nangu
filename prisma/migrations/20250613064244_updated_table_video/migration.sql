/*
  Warnings:

  - You are about to drop the column `mediaId` on the `video` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `video` table. All the data in the column will be lost.
  - You are about to drop the `media` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `filename` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `video` DROP FOREIGN KEY `Video_mediaId_fkey`;

-- DropIndex
DROP INDEX `Video_mediaId_fkey` ON `video`;

-- AlterTable
ALTER TABLE `video` DROP COLUMN `mediaId`,
    DROP COLUMN `url`,
    ADD COLUMN `filename` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `size` INTEGER NOT NULL;

-- DropTable
DROP TABLE `media`;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_phone_fkey` FOREIGN KEY (`phone`) REFERENCES `user`(`phone`) ON DELETE CASCADE ON UPDATE CASCADE;
