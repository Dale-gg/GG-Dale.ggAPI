import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export default class CreateParticipant1588732481056
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'participants',
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
          },
          {
            name: 'match_id',
            type: 'uuid',
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
            isNullable: true,
          },
          {
            name: 'highest_achieved_season_tier',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'spell1_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'spell2_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'perk0',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'perk1',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'perk2',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'perk3',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'perk4',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'perk5',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'item0',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'item1',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'item2',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'item3',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'item4',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'item5',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'item6',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'kills',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'deaths',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'assists',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'win',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'double_kills',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'triple_kills',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'quadra_kills',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'penta_kills',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'champ_level',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'turret_kills',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'gold_earned',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'cs',
            type: 'integer',
            isNullable: true,
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
      'participants',
      new TableForeignKey({
        columnNames: ['champion_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'champions',
        name: 'ParticipantsChampion',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'participants',
      new TableForeignKey({
        columnNames: ['match_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'matchs',
        name: 'ParticipantsMatchs',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('participants')
  }
}
