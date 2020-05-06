import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateRune1588771616310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'runes',
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
              name: 'tree_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'key',
              type: 'integer',
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
              name: 'shortDesc',
              type: 'varchar',
            },
            {
              name: 'longDesc',
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

      await queryRunner.createForeignKey(
        'runes',
        new TableForeignKey({
          columnNames: ['tree_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'trees',
          name: 'RunesTress',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('runes');
    }

}
