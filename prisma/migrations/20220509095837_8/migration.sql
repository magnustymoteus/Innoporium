/*
  Warnings:

  - You are about to drop the column `status` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the `keycard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `keycard_available` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_keycard` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productID` to the `purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchase` DROP COLUMN `status`,
    ADD COLUMN `amount` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `productID` INTEGER UNSIGNED NOT NULL;

-- DropTable
DROP TABLE `keycard`;

-- DropTable
DROP TABLE `keycard_available`;

-- DropTable
DROP TABLE `purchase_keycard`;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `description` TEXT NULL,
    `price` FLOAT NOT NULL,
    `inStock` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wishlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientID` INTEGER UNSIGNED NOT NULL,
    `productID` INTEGER UNSIGNED NOT NULL,
    `amount` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
