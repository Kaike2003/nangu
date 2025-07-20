-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_phone_fkey`;

-- DropIndex
DROP INDEX `Image_phone_fkey` ON `image`;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_phone_fkey` FOREIGN KEY (`phone`) REFERENCES `user`(`phone`) ON DELETE CASCADE ON UPDATE CASCADE;
