import { MigrationInterface, QueryRunner } from 'typeorm';

export class base1678877773440 implements MigrationInterface {
  name = 'base1678877773440';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "token" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_8b1b0180229dec2cbfdf5e776e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "bots" ADD CONSTRAINT "FK_ce06dfaddfec7a65f8531b6218b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bots" DROP CONSTRAINT "FK_ce06dfaddfec7a65f8531b6218b"`,
    );
    await queryRunner.query(`DROP TABLE "bots"`);
  }
}
