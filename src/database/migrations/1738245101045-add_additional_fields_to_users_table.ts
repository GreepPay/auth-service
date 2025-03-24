import type { MigrationInterface, QueryRunner } from "typeorm";
import { TableColumn } from 'typeorm';

export class AddAdditionalFieldsToUsersTable1738245101045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("users", [
            new TableColumn({
                name: "state",
                type: "varchar",
                isNullable: true,
            }),
            new TableColumn({
                name: "country",
                type: "varchar",
                isNullable: true,
            }),
            new TableColumn({
                name: "default_currency",
                type: "varchar",
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "state");
        await queryRunner.dropColumn("users", "country");
        await queryRunner.dropColumn("users", "default_currency");
    }
}