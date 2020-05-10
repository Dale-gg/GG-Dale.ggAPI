export interface IChampion {
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

export interface ISummoner {
  account_id?: string
  summoner_id?: string
  puuid?: string
  revision_date?: Date
  region?: string
  summonerName?: string
}

export interface IFactory {
  Summoner(data: ISummoner): Promise<void>
  ManySummoners(value: number, data: ISummoner): Promise<void>
  Champion(data: IChampion): Promise<void>
}
