-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_mediaId_fkey`;

-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `media_userId_fkey`;

-- DropForeignKey
ALTER TABLE `video` DROP FOREIGN KEY `Video_mediaId_fkey`;

-- DropIndex
DROP INDEX `Image_mediaId_fkey` ON `image`;

-- DropIndex
DROP INDEX `media_userId_fkey` ON `media`;

-- DropIndex
DROP INDEX `Video_mediaId_fkey` ON `video`;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `media`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `media`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
