import { IChampionObject } from '../../types/IChampion'

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('champions')
class Champion implements IChampionObject {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  key: string

  @Column()
  title: string

  @Column('varchar', {
    array: true,
    default: () => 'array[]::varchar[]',
    nullable: true,
  })
  tags: string[]

  @Column()
  version: string

  @Column()
  image_full_url: string

  @Column()
  image_splash_url: string

  @Column()
  image_loading_url: string

  @Column()
  image_sprite_url: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // Relations -> Matchlist, Participant
}

export default Champion
