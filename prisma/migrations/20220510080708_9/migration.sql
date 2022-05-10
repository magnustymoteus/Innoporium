/*
  Warnings:

  - You are about to drop the `purchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `purchase`;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `clientID` INTEGER UNSIGNED NOT NULL,
    `productID` INTEGER UNSIGNED NOT NULL,
    `amount` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
