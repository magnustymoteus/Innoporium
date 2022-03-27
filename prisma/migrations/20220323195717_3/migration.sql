-- CreateTable
CREATE TABLE `client` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `admin` INTEGER NOT NULL DEFAULT 0,
    `firstName` VARCHAR(45) NOT NULL,
    `secondName` VARCHAR(45) NOT NULL,
    `gender` ENUM('M', 'V') NOT NULL,
    `phoneNumber` VARCHAR(45) NOT NULL,
    `streetName` VARCHAR(30) NOT NULL,
    `houseNumber` VARCHAR(4) NOT NULL,
    `postCode` VARCHAR(10) NOT NULL,
    `birthDate` DATE NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `sector` VARCHAR(10) NOT NULL,
    `email` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `purchaseStatus` TINYINT NOT NULL,
    `clientID` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_ticket` (
    `purchaseTicketID` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `purchaseID` INTEGER NOT NULL,
    `ticketID` INTEGER NOT NULL,

    PRIMARY KEY (`purchaseTicketID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket` (
    `ticketID` INTEGER NOT NULL AUTO_INCREMENT,
    `ticket` VARCHAR(45) NOT NULL,
    `description` TEXT NOT NULL,
    `price` FLOAT NOT NULL,
    `imageSrc` VARCHAR(50) NOT NULL,
    `ticketTypeID` INTEGER NOT NULL,

    PRIMARY KEY (`ticketID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket_available` (
    `TicketAvailableID` INTEGER NOT NULL AUTO_INCREMENT,
    `inStock` INTEGER NOT NULL,
    `ticketID` INTEGER NOT NULL,

    PRIMARY KEY (`TicketAvailableID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket_type` (
    `ticketTypeID` INTEGER NOT NULL,
    `ticketType` VARCHAR(45) NOT NULL,
    `days` INTEGER NOT NULL,
    `clearance` INTEGER NOT NULL,

    PRIMARY KEY (`ticketTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
