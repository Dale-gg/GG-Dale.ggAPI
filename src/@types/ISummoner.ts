export default interface ISummoner {
  account_id?: string
  summoner_id?: string
  puuid?: string
  profile_icon?: number
  summoner_name?: string
  summoner_level?: number
  region?: string
  revision_date?: number | Date
}

export interface ISummonerObject {
  id: string
  account_id: string
  summoner_id: string
  puuid: string
  profile_icon: number
  summoner_name: string
  summoner_level: number
  region: string
  revision_date: number | Date
  created_at: Date
  updated_at: Date
}
