import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export default class CreateMatchlist1588730365290
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'matchlists',
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
            name: 'champion_id',
            type: 'uuid',
          },
          {
            name: 'champion_key',
            type: 'integer',
          },
          {
            name: 'game_id',
            type: 'integer',
          },
          {
            name: 'platform_id',
            type: 'varchar',
          },
          {
            name: 'lane',
            type: 'varchar',
          },
          {
            name: 'queue',
            type: 'integer',
          },
          {
            name: 'role',
            type: 'varchar',
          },
          {
            name: 'season',
            type: 'integer',
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
      'matchlists',
      new TableForeignKey({
        columnNames: ['summoner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'summoners',
        name: 'SummonersMatchlists',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'matchlists',
      new TableForeignKey({
        columnNames: ['champion_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'champions',
        name: 'ChampionsMatchlists',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('matchlists')
  }
}
