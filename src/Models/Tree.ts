import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('trees')
class Tree {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_api: number;

  @Column()
  key: string;

  @Column()
  icon: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations -> Runes
}

export default Tree;
