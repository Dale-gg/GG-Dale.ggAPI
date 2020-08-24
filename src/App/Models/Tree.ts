import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ITreeObject } from '../../Interfaces/ITree'

@Entity('gg_trees')
class Tree implements ITreeObject {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  id_api: number

  @Column()
  key: string

  @Column()
  icon: string

  @Column()
  name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Tree
