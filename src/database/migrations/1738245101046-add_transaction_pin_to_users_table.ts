import type { MigrationInterface, QueryRunner } from "typeorm";
import { TableColumn } from "typeorm";

export class AddTransactionPinToUsersTable1684256790000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("users");

    if (table) {
      const hasTransactionPin = table.columns.some(
        (column) => column.name === "transaction_pin"
      );

      if (!hasTransactionPin) {
        await queryRunner.addColumn(
          "users",
          new TableColumn({
            name: "transaction_pin",
            type: "varchar",
            isNullable: true,
          })
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("users");

    if (table) {
      const hasTransactionPin = table.columns.some(
        (column) => column.name === "transaction_pin"
      );

      if (hasTransactionPin) {
        await queryRunner.dropColumn("users", "transaction_pin");
      }
    }
  }
}