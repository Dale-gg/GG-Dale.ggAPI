import { IMatchlistObject } from './IMatchlist'

export default interface IMatch {
  matchlist?: IMatchlistObject
  matchlist_id?: string
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
}

export interface IMatchObject {
  id: string
  matchlist: IMatchlistObject
  matchlist_id: string
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
  created_at: Date
  updated_at: Date
}
