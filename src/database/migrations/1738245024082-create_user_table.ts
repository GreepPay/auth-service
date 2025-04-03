import type { MigrationInterface, QueryRunner } from "typeorm";
import pkg from "typeorm";
const { Table } = pkg;

export class CreateUserTable1738245024082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable("users");

    if (!tableExists) {
      await queryRunner.createTable(
        new Table({
          name: "users",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment",
            },
            { name: "uuid", type: "varchar", isUnique: true },
            { name: "first_name", type: "varchar" },
            { name: "last_name", type: "varchar" },
            { name: "username", type: "varchar" },
            { name: "email", type: "varchar", isUnique: true },
            { name: "phone", type: "varchar", isNullable: true },
            { name: "email_verified_at", type: "timestamp", isNullable: true },
            { name: "password", type: "varchar" },
            { name: "password_created_at", type: "timestamp" },
            { name: "phone_verified_at", type: "timestamp", isNullable: true },
            { name: "status", type: "varchar", default: "'active'" },
            { name: "otp", type: "varchar", isNullable: true },
            { name: "otp_expired_at", type: "timestamp", isNullable: true },
            { name: "role_id", type: "varchar", isNullable: true },
            { name: "deleted_at", type: "timestamp", isNullable: true },
            { name: "sso_id", type: "varchar", isNullable: true },
            {
              name: "created_at",
              type: "timestamp",
              default: "CURRENT_TIMESTAMP",
            },
            {
              name: "updated_at",
              type: "timestamp",
              default: "CURRENT_TIMESTAMP",
            },
          ],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
