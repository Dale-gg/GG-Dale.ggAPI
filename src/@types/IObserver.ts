export interface ISubject {
  registerObserver(o: IObserver): void
  removeObserver(o: IObserver): void
  notifyObservers(): void
}

export interface IObserver {
  updateSummoner(summoner: object): void
}
