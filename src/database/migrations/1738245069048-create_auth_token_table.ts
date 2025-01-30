import type { MigrationInterface, QueryRunner } from "typeorm";
import { Table } from "typeorm/browser";

export class CreateAuthTokenTable1738245069048 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'auth_tokens',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'auth_id', type: 'varchar' },
                { name: 'auth_token', type: 'varchar' },
                { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('auth_tokens');
    }

}
