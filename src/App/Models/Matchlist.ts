import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm'

import Summoner from './Summoner'
import Champion from './Champion'
import { IMatchlistObject } from '../../Interfaces/IMatchlist'

@Entity('matchlists')
class Matchlist implements IMatchlistObject {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Summoner)
  @JoinColumn({ name: 'summoner_id' })
  summoner: Summoner

  @Column()
  summoner_id: string

  @OneToOne(() => Champion)
  @JoinColumn({ name: 'champion_id' })
  champion: Champion

  @Column()
  champion_id: string

  @Column()
  champion_key: number

  @Column()
  game_id: number

  @Column()
  platform_id: string

  @Column()
  lane: string

  @Column()
  queue: number

  @Column()
  role: string

  @Column()
  timestamp: number

  @Column()
  season: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // Relations -> Summoner, Champion, Match
}

export default Matchlist
