import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import Participantlist from './Participantlist'

@Entity('participants')
class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Participantlist)
  @JoinColumn({ name: 'participantlist_id' })
  participantlist: Participantlist

  @Column()
  spell1Id: number

  @Column()
  spell2Id: number

  @Column()
  participantlist_id: string

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

  // Relations -> Participantlist
}

export default Participant
