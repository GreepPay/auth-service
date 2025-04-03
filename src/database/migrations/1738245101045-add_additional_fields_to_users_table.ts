import type { MigrationInterface, QueryRunner } from "typeorm";
import { TableColumn } from "typeorm";

export class AddAdditionalFieldsToUsersTable1738245101045
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("users");

    if (table) {
      const stateColumnExists = table.columns.some(
        (column) => column.name === "state",
      );
      const countryColumnExists = table.columns.some(
        (column) => column.name === "country",
      );
      const defaultCurrencyColumnExists = table.columns.some(
        (column) => column.name === "default_currency",
      );

      const columnsToAdd: TableColumn[] = [];

      if (!stateColumnExists) {
        columnsToAdd.push(
          new TableColumn({
            name: "state",
            type: "varchar",
            isNullable: true,
          }),
        );
      }

      if (!countryColumnExists) {
        columnsToAdd.push(
          new TableColumn({
            name: "country",
            type: "varchar",
            isNullable: true,
          }),
        );
      }

      if (!defaultCurrencyColumnExists) {
        columnsToAdd.push(
          new TableColumn({
            name: "default_currency",
            type: "varchar",
            isNullable: true,
          }),
        );
      }

      if (columnsToAdd.length > 0) {
        await queryRunner.addColumns("users", columnsToAdd);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("users");

    if (table) {
      const stateColumnExists = table.columns.some(
        (column) => column.name === "state",
      );
      const countryColumnExists = table.columns.some(
        (column) => column.name === "country",
      );
      const defaultCurrencyColumnExists = table.columns.some(
        (column) => column.name === "default_currency",
      );

      if (stateColumnExists) {
        await queryRunner.dropColumn("users", "state");
      }
      if (countryColumnExists) {
        await queryRunner.dropColumn("users", "country");
      }
      if (defaultCurrencyColumnExists) {
        await queryRunner.dropColumn("users", "default_currency");
      }
    }
  }
}
