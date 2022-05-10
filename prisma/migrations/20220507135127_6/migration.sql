/*
  Warnings:

  - You are about to drop the column `ticketTypeID` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the `ticket_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tier` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `ticketTypeID`,
    ADD COLUMN `tier` ENUM('Tier1', 'Tier2', 'Tier3') NOT NULL;

-- DropTable
DROP TABLE `ticket_type`;
