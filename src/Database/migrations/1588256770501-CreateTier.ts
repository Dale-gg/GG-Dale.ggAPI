import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export default class CreateTier1588256770501 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tiers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'summoner_id',
            type: 'uuid',
          },
          {
            name: 'league_id',
            type: 'varchar',
          },
          {
            name: 'queue_type',
            type: 'varchar',
          },
          {
            name: 'tier',
            type: 'varchar',
          },
          {
            name: 'rank',
            type: 'varchar',
          },
          {
            name: 'pdl',
            type: 'integer',
          },
          {
            name: 'winrate',
            type: 'varchar',
          },
          {
            name: 'wins',
            type: 'integer',
          },
          {
            name: 'losses',
            type: 'integer',
          },
          {
            name: 'inactive',
            type: 'boolean',
          },
          {
            name: 'veteran',
            type: 'boolean',
          },
          {
            name: 'hot_streak',
            type: 'boolean',
          },
          {
            name: 'fresh_blood',
            type: 'boolean',
          },
          {
            name: 'season',
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

    await queryRunner.createForeignKey(
      'tiers',
      new TableForeignKey({
        columnNames: ['summoner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'summoners',
        name: 'SummonerTier',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tiers')
  }
}
