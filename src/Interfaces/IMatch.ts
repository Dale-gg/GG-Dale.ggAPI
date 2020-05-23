import { ISummonerObject } from './ISummoner'
import { IChampionObject } from './IChampion'

export default interface IMatch {
  summoner?: ISummonerObject
  summoner_id?: string
  champion?: IChampionObject
  champion_id?: string
  champion_key?: number
  map_id?: string
  game_id?: number
  queue_id?: number
  platform_id?: string
  season_id?: number
  game_mode?: string
  game_version?: string
  game_type?: string
  game_duration?: number
  game_creation?: number
  remake?: boolean
  timestramp?: number
}

export interface IMatchObject {
  id: string
  summoner: ISummonerObject
  summoner_id: string
  champion: IChampionObject
  champion_id: string
  champion_key: number
  map_id: string
  game_id: number
  queue_id: number
  platform_id: string
  season_id: number
  game_mode: string
  game_version: string
  game_type: string
  game_duration: number
  game_creation: number
  remake: boolean
  timestamp: number
  created_at: Date
  updated_at: Date
}
