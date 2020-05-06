import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateTree1588730365285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'trees',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'id_api',
              type: 'integer',
            },
            {
              name: 'key',
              type: 'varchar',
            },
            {
              name: 'icon',
              type: 'varchar',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('trees');
    }

}
