import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import Champion from './Champion'
import Match from './Match'

@Entity('participantlist')
class Participantlist {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Champion)
  @JoinColumn({ name: 'champion_id' })
  champion: Champion

  @Column()
  champion_id: string

  @ManyToOne(() => Match)
  @JoinColumn({ name: 'match_id' })
  match: Match

  @Column()
  match_id: string

  @Column()
  team_id: number

  @Column()
  game_id: number

  @Column()
  account_id: string

  @Column()
  summoner_id: string

  @Column()
  summoner_name: string

  @Column()
  profile_icon: number

  @Column()
  participant_api_id: number

  @Column()
  champion_key: number

  @Column()
  highest_achieved_season_tier: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // Relations -> Match, Champion, Participant, Spells
}

export default Participantlist
