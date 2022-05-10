/*
  Warnings:

  - You are about to alter the column `type` on the `client` table. The data in that column could be lost. The data in that column will be cast from `Enum("client_type")` to `Enum("client_type")`.
  - You are about to drop the column `purchaseStatus` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the `purchase_ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticket_available` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `ubits` FLOAT NOT NULL DEFAULT 5.62251,
    MODIFY `type` ENUM('native', 'github', 'discord') NOT NULL DEFAULT 'native';

-- AlterTable
ALTER TABLE `purchase` DROP COLUMN `purchaseStatus`,
    ADD COLUMN `status` ENUM('pending', 'finished') NOT NULL;

-- DropTable
DROP TABLE `purchase_ticket`;

-- DropTable
DROP TABLE `ticket`;

-- DropTable
DROP TABLE `ticket_available`;

-- CreateTable
CREATE TABLE `purchase_keycard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `purchaseID` INTEGER NOT NULL,
    `keycardID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `keycard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tier` ENUM('tier1', 'tier2', 'tier3') NOT NULL,
    `description` TEXT NOT NULL,
    `price` FLOAT NOT NULL,
    `imageSrc` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `keycard_available` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inStock` INTEGER NOT NULL,
    `keycardID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
