import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Matchlist from './Matchlist';

@Entity('matchs')
class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Matchlist)
  @JoinColumn({ name: 'matchlist_id' })
  matchlist: Matchlist;

  @Column()
  matchlist_id: string;

  @Column()
  map_id: number;

  @Column()
  game_id: string;

  @Column()
  queue_id: number;

  @Column()
  platform_id: string;

  @Column()
  game_mode: string;

  @Column()
  game_version: string;

  @Column()
  game_type: string;

  @Column()
  game_duration: number;

  @Column()
  game_creation: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations -> Matchlist, Participants
}

export default Match;
