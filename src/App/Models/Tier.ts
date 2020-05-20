import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import Summoner from './Summoner'
import { ITierObject } from '../../Interfaces/ITier'

@Entity('tiers')
class Tier implements ITierObject {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(_type => Summoner, summoner => summoner.tiers)
  @JoinColumn({ name: 'summoner_id' })
  summoner: Summoner

  @Column()
  summoner_id: string

  @Column()
  league_id: string

  @Column()
  queue_type: string

  @Column()
  tier: string

  @Column()
  rank: string

  @Column()
  pdl: number

  @Column()
  winrate: string

  @Column()
  wins: number

  @Column()
  losses: number

  @Column()
  inactive: boolean

  @Column()
  veteran: boolean

  @Column()
  hot_streak: boolean

  @Column()
  fresh_blood: boolean

  @Column()
  season: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // Relations -> Summoner
}

export default Tier
