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
            name: 'spell_id1',
            type: 'integer',
          },
          {
            name: 'spell_id2',
            type: 'integer',
          },
          {
            name: 'perk0',
            type: 'integer',
          },
          {
            name: 'perk1',
            type: 'integer',
          },
          {
            name: 'perk2',
            type: 'integer',
          },
          {
            name: 'perk3',
            type: 'integer',
          },
          {
            name: 'perk4',
            type: 'integer',
          },
          {
            name: 'perk5',
            type: 'integer',
          },
          {
            name: 'item0',
            type: 'integer',
          },
          {
            name: 'item1',
            type: 'integer',
          },
          {
            name: 'item2',
            type: 'integer',
          },
          {
            name: 'item3',
            type: 'integer',
          },
          {
            name: 'item4',
            type: 'integer',
          },
          {
            name: 'item5',
            type: 'integer',
          },
          {
            name: 'item6',
            type: 'integer',
          },
          {
            name: 'kills',
            type: 'integer',
          },
          {
            name: 'deaths',
            type: 'integer',
          },
          {
            name: 'assists',
            type: 'integer',
          },
          {
            name: 'win',
            type: 'boolean',
          },
          {
            name: 'double_kills',
            type: 'integer',
          },
          {
            name: 'triple_kills',
            type: 'integer',
          },
          {
            name: 'quadra_kills',
            type: 'integer',
          },
          {
            name: 'penta_kills',
            type: 'integer',
          },
          {
            name: 'champ_level',
            type: 'integer',
          },
          {
            name: 'turret_kills',
            type: 'integer',
          },
          {
            name: 'gold_earned',
            type: 'integer',
          },
          {
            name: 'cs',
            type: 'integer',
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
