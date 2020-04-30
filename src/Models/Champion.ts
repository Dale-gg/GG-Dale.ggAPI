import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('champions')
class Champion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  tags: string[];

  @Column()
  version: string;

  @Column()
  image_full_url: string;

  @Column()
  image_splash_url: string;

  @Column()
  image_loading_url: string;

  @Column()
  image_sprite_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations -> Matchlist, Participant
}

export default Champion;
