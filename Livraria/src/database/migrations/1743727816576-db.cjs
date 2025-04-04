const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Db1743727816576 {
    name = 'Db1743727816576'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`password\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`typeUser\` enum ('admin', 'comum') NOT NULL, \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleteAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
