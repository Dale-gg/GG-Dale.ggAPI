import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Summoner from './Summoner'

@Entity('tiers')
class Tier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Summoner)
  @JoinColumn({ name: 'summoner_id' })
  summoner: Summoner;

  @Column()
  summoner_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations -> Summoner
}

export default Tier;
