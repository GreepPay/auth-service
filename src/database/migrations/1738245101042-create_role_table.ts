import type { MigrationInterface, QueryRunner } from "typeorm";
import pkg from 'typeorm';
const { Table } = pkg;

export class CreateRoleTable1738245101042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'roles',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'uuid', type: 'varchar', isUnique: true },
                { name: 'name', type: 'varchar' },
                { name: 'editable_name', type: 'varchar', isNullable: true },
                { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('roles');
    }

}
