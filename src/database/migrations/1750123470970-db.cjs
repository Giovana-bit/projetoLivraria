/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1750123470970 {
    name = 'Db1750123470970'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`password\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`typeUser\` enum ('admin', 'comum') NOT NULL, \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleteAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`publisher\` (\`id\` int NOT NULL AUTO_INCREMENT, \`publisher_name\` varchar(100) NOT NULL, \`cnpj\` varchar(45) NOT NULL, \`email\` varchar(100) NOT NULL, \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleteAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url_photo_profile\` varchar(250) NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name_category\` varchar(45) NOT NULL, \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleteAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bookAuthor\` (\`authorId\` int NOT NULL, \`bookId\` int NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`authorId\`, \`bookId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`book_name\` varchar(45) NOT NULL, \`publication\` date NOT NULL, \`pages\` int NOT NULL, \`price\` decimal(6,2) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, \`categoryId\` int NOT NULL, \`publisherId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`author\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name_author\` varchar(45) NOT NULL, \`nasc_author\` datetime NOT NULL, \`nationality\` varchar(45) NOT NULL, \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleteAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookAuthor\` ADD CONSTRAINT \`FK_cb3c71aa97241f41178f95f992f\` FOREIGN KEY (\`authorId\`) REFERENCES \`author\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookAuthor\` ADD CONSTRAINT \`FK_2ab45f67735aaabd975d5767606\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_efaa1a4d8550ba5f4378803edb2\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_b8988524dd01b5dcb67b4b3ede7\` FOREIGN KEY (\`publisherId\`) REFERENCES \`publisher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_b8988524dd01b5dcb67b4b3ede7\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_efaa1a4d8550ba5f4378803edb2\``);
        await queryRunner.query(`ALTER TABLE \`bookAuthor\` DROP FOREIGN KEY \`FK_2ab45f67735aaabd975d5767606\``);
        await queryRunner.query(`ALTER TABLE \`bookAuthor\` DROP FOREIGN KEY \`FK_cb3c71aa97241f41178f95f992f\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`DROP TABLE \`author\``);
        await queryRunner.query(`DROP TABLE \`book\``);
        await queryRunner.query(`DROP TABLE \`bookAuthor\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
        await queryRunner.query(`DROP TABLE \`publisher\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
