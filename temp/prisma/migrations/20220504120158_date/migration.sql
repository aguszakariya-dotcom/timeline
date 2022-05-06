-- CreateTable
CREATE TABLE `timeline` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer` VARCHAR(128) NOT NULL,
    `style` VARCHAR(128) NOT NULL,
    `qty` INTEGER NOT NULL,
    `keterangan` VARCHAR(128) NOT NULL,
    `finish_at` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
