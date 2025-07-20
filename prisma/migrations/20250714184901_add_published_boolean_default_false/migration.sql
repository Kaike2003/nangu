-- AlterTable
ALTER TABLE `image` ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `video` ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false;
