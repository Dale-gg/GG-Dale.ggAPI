import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import Tree from './Tree'
import { IRuneObject } from '../../Interfaces/IRune'

@Entity('runes')
class Rune implements IRuneObject {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Tree)
  @JoinColumn({ name: 'tree_id' })
  tree: Tree

  @Column()
  tree_id: string

  @Column()
  id_api: number

  @Column()
  key: string

  @Column()
  icon: string

  @Column()
  name: string

  @Column()
  shortDesc: string

  @Column()
  longDesc: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Rune
