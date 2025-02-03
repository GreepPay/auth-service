import type { MigrationInterface, QueryRunner } from "typeorm";
import pkg from 'typeorm';
const { Table } = pkg;

export class CreatePermissionTable1738245093396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'permissions',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'uuid', type: 'varchar', isUnique: true },
                { name: 'role_id', type: 'varchar' },
                { name: 'status', type: 'boolean', default: false },
                { name: 'name', type: 'varchar' },
                { name: 'key', type: 'varchar' },
                { name: 'sub_key', type: 'varchar' },
                { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('permissions');
    }

}
