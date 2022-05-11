-- AlterTable
ALTER TABLE `client` MODIFY `ubits` DECIMAL(5, 2) NOT NULL DEFAULT 5.62;

-- AlterTable
ALTER TABLE `products` MODIFY `price` DECIMAL(5, 2) NOT NULL;
