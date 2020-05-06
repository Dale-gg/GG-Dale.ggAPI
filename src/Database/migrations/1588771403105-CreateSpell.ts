import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateSpell1588771403105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'spells',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'key',
              type: 'integer',
            },
            {
              name: 'spell_dd',
              type: 'varchar',
            },
            {
              name: 'description',
              type: 'varchar',
            },
            {
              name: 'group',
              type: 'varchar',
            },
            {
              name: 'modes',
              type: 'varchar',
            },
            {
              name: 'image_full_url',
              type: 'varchar',
            },
            {
              name: 'image_sprite_url',
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
      await queryRunner.dropTable('participants');
    }

}
