import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('spells')
class Spell {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  key: number

  @Column()
  spell_dd: string

  @Column()
  description: string

  @Column()
  group: string

  @Column()
  modes: string

  @Column()
  image_full_url: string

  @Column()
  image_sprite_url: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // Relations -> Participants
}

export default Spell
