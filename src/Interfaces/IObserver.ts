import { Regions } from '@dale-gg/zedjs/build/constants'

export interface ISubject {
  registerObserver(o: IObserver): void
  removeObserver(o: IObserver): void
  notifyObservers(): void
}

export interface IObserver {
  updateSummoner(summoner: object, region: Regions): void
}
