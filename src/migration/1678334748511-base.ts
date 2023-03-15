import { MigrationInterface, QueryRunner } from 'typeorm';

export class base1678334748511 implements MigrationInterface {
  name = 'base1678334748511';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "phoneNumber" character varying NOT NULL, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "UQ_29a05908a0fa0728526d2833657" UNIQUE ("username"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "User"`);
  }
}
