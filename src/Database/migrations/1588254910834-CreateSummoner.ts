import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateSummoner1588254910834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'summoners',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'account_id',
            type: 'varchar',
          },
          {
            name: 'summoner_id',
            type: 'varchar',
          },
          {
            name: 'puuid',
            type: 'varchar',
          },
          {
            name: 'profile_icon',
            type: 'integer',
          },
          {
            name: 'summoner_name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'summoner_level',
            type: 'integer',
          },
          {
            name: 'region',
            type: 'varchar',
          },
          {
            name: 'revision_date',
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
    await queryRunner.dropTable('summoners')
  }
}
