import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateChampion1588730365289 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'champions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'key',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'tags',
            type: 'varchar[]',
          },
          {
            name: 'version',
            type: 'varchar',
          },
          {
            name: 'image_full_url',
            type: 'varchar',
          },
          {
            name: 'image_splash_url',
            type: 'varchar',
          },
          {
            name: 'image_loading_url',
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
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('champions')
  }
}
