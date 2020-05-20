export default interface ITier {
  summoner_id?: string
  league_id?: string
  queue_type?: string
  tier?: string
  rank?: string
  pdl?: number
  winrate?: string
  wins?: number
  losses?: number
  inactive?: boolean
  veteran?: boolean
  hot_streak?: boolean
  fresh_blood?: boolean
  season?: string
}

export interface ITierObject {
  id: string
  summoner_id: string
  league_id: string
  queue_type: string
  tier: string
  rank: string
  pdl: number
  winrate: string
  wins: number
  losses: number
  inactive: boolean
  veteran: boolean
  hot_streak: boolean
  fresh_blood: boolean
  season: string
  created_at: Date
  updated_at: Date
}
