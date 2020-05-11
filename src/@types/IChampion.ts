export default interface IChampion {
  name: string
  key: string
  title: string
  tags: string[]
  version: string
  image_full_url?: string
  image_loading_url?: string
  image_splash_url?: string
  image_sprite_url?: string
}

export interface IChampionObject {
  id: string
  name: string
  key: string
  title: string
  tags: string[]
  version: string
  image_full_url: string
  image_splash_url: string
  image_loading_url: string
  image_sprite_url: string
  created_at: Date
  updated_at: Date
}
