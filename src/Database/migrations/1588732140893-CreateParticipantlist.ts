import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export default class CreateParticipantlist1588732140893
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'participantlists',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'champion_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'match_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'team_id',
            type: 'integer',
          },
          {
            name: 'game_id',
            type: 'bigint',
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
            name: 'summoner_name',
            type: 'varchar',
          },
          {
            name: 'profile_icon',
            type: 'integer',
          },
          {
            name: 'participant_api_id',
            type: 'integer',
          },
          {
            name: 'champion_key',
            type: 'varchar',
          },
          {
            name: 'highest_achieved_season_tier',
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
      'participantlists',
      new TableForeignKey({
        columnNames: ['champion_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'champions',
        name: 'ParticipantlistsChampion',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'participantlists',
      new TableForeignKey({
        columnNames: ['match_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'matchs',
        name: 'ParticipantlistsMatchs',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('champions')
  }
}
