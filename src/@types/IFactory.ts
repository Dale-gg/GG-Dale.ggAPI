import ISummoner from './ISummoner'
import IChampion from './IChampion'

export default interface IFactory {
  Summoner(data: ISummoner): Promise<void>
  ManySummoners(value: number, data: ISummoner): Promise<void>
  Champion(data: IChampion): Promise<void>
}
