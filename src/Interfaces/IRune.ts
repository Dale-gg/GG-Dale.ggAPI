import { ITreeObject } from './ITree'

export default interface IRune {
  tree?: ITreeObject
  tree_id?: string
  id_api?: number
  key?: string
  icon?: string
  name?: string
  shortDesc?: string
  longDesc?: string
}

export interface IRuneObject {
  id: string
  tree: ITreeObject
  tree_id: string
  id_api: number
  key: string
  icon: string
  name: string
  shortDesc: string
  longDesc: string
  created_at: Date
  updated_at: Date
}
