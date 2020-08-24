import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm'

import { IMatchObject } from '../../Interfaces/IMatch'
import Summoner from './Summoner'
import Champion from './Champion'
import Participant from './Participant'

@Entity('gg_matchs')
class Match implements IMatchObject {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(_type => Participant, participant => participant.match)
  participants?: Participant[]

  @OneToOne(() => Champion)
  @JoinColumn({ name: 'champion_id' })
  champion: Champion

  @Column()
  champion_id: string

  @Column()
  champion_key: number

  @ManyToOne(() => Summoner)
  @JoinColumn({ name: 'summoner_id' })
  summoner: Summoner

  @Column()
  summoner_id: string

  @Column()
  map_id: string

  @Column()
  game_id: number

  @Column()
  queue_id: number

  @Column()
  platform_id: string

  @Column()
  season_id: number

  @Column()
  role: string

  @Column()
  game_mode: string

  @Column()
  game_version: string

  @Column()
  game_type: string

  @Column()
  game_duration: number

  @Column()
  game_creation: number

  @Column()
  remake: boolean

  @Column()
  timestamp: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Match
