/*
  Warnings:

  - You are about to drop the column `amount` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `clientID` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `productID` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `wishlist` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cost` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `amount`,
    DROP COLUMN `clientID`,
    DROP COLUMN `productID`,
    ADD COLUMN `cost` DECIMAL(5, 2) NOT NULL;

-- DropTable
DROP TABLE `wishlist`;

-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionID` INTEGER UNSIGNED NULL,
    `clientID` INTEGER UNSIGNED NOT NULL,
    `productID` INTEGER UNSIGNED NOT NULL,
    `amount` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
