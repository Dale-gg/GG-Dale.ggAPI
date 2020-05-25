import { ISummonerObject } from '../../Interfaces/ISummoner'

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import Tier from './Tier'
import Match from './Match'

@Entity('summoners')
class Summoner implements ISummonerObject {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  account_id: string

  @Column()
  summoner_id: string

  @Column()
  puuid: string

  @Column()
  profile_icon: number

  @Column()
  summoner_name: string

  @Column()
  summoner_level: number

  @Column()
  region: string

  @Column()
  revision_date: number

  @OneToMany(_type => Tier, tier => tier.summoner)
  tiers?: Tier[]

  @OneToMany(_type => Match, match => match.summoner)
  matchs?: Match[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Summoner
