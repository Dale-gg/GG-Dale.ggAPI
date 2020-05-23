import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export default class CreateMatch1588731228914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'matchs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'map_id',
            type: 'varchar',
          },
          {
            name: 'game_id',
            type: 'integer',
          },
          {
            name: 'queue_id',
            type: 'integer',
          },
          {
            name: 'season_id',
            type: 'integer',
          },
          {
            name: 'platform_id',
            type: 'varchar',
          },
          {
            name: 'summoner_id',
            type: 'uuid',
          },
          {
            name: 'champion_id',
            type: 'uuid',
          },
          {
            name: 'champion_key',
            type: 'integer',
          },
          {
            name: 'role',
            type: 'varchar',
          },
          {
            name: 'game_mode',
            type: 'varchar',
          },
          {
            name: 'game_version',
            type: 'varchar',
          },
          {
            name: 'game_type',
            type: 'varchar',
          },
          {
            name: 'game_duration',
            type: 'bigint',
          },
          {
            name: 'game_creation',
            type: 'bigint',
          },
          {
            name: 'remake',
            type: 'boolean',
          },
          {
            name: 'timestamp',
            type: 'bigint',
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
      'matchs',
      new TableForeignKey({
        columnNames: ['summoner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'summoners',
        name: 'SummonersMatchs',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'matchs',
      new TableForeignKey({
        columnNames: ['champion_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'champions',
        name: 'ChampionsMatchs',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('matchs')
  }
}
