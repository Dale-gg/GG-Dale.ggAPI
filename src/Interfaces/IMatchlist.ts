import { IChampionObject } from './IChampion'
import { ISummonerObject } from './ISummoner'

export default interface IMatchlist {
  summoner?: ISummonerObject
  summoner_id?: string
  champion?: IChampionObject
  champion_id?: number
  champion_key?: string
  game_id?: number
  platform_id?: string
  lane?: string
  queue?: number
  role?: string
  timestamp?: number
  season?: number
}

export interface IMatchlistObject {
  id: string
  summoner: ISummonerObject
  summoner_id: string
  champion: IChampionObject
  champion_id: string
  champion_key: number
  game_id: number
  platform_id: string
  lane: string
  queue: number
  role: string
  timestamp: number
  season: number
  created_at: Date
  updated_at: Date
}
