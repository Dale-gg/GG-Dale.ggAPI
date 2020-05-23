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

import { IParticipantObject } from '../../Interfaces/IParticipant'

@Entity('participants')
class Participant implements IParticipantObject {
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
  champion_key: number

  @Column()
  highest_achieved_season_tier: string

  @Column()
  spell1Id: number

  @Column()
  spell2Id: number

  @Column()
  participant_api_id: number

  @Column()
  kills: number

  @Column()
  deaths: number

  @Column()
  assists: number

  @Column()
  win: boolean

  @Column()
  double_kills: number

  @Column()
  triple_kills: number

  @Column()
  quadra_kills: number

  @Column()
  penta_kills: number

  @Column()
  champ_level: number

  @Column()
  turret_kills: number

  @Column()
  gold_earned: number

  @Column()
  cs: number

  @Column()
  perk0: number

  @Column()
  perk1: number

  @Column()
  perk2: number

  @Column()
  perk3: number

  @Column()
  perk4: number

  @Column()
  perk5: number

  @Column()
  item0: number

  @Column()
  item1: number

  @Column()
  item2: number

  @Column()
  item3: number

  @Column()
  item4: number

  @Column()
  item5: number

  @Column()
  item6: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Participant
