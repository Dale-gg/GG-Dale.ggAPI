import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Tree from './Tree';

@Entity('runes')
class Rune {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tree)
  @JoinColumn({ name: 'tree_id' })
  tree: Tree;

  @Column()
  tree_id: string;

  @Column()
  id_api: number;

  @Column()
  key: string;

  @Column()
  icon: string;

  @Column()
  name: string;

  @Column()
  shortDesc: string;

  @Column()
  longDesc: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations -> Tree
}

export default Rune;
