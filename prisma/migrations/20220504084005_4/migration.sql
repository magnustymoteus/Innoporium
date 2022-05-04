-- AlterTable
ALTER TABLE `client` ADD COLUMN `type` ENUM('Native', 'Other') NOT NULL DEFAULT 'Native';
