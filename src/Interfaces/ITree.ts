export default interface ITree {
  id_api?: number
  key?: string
  icon?: string
  name?: string
}

export interface ITreeObject {
  id: string
  id_api: number
  key: string
  icon: string
  name: string
  created_at: Date
  updated_at: Date
}
