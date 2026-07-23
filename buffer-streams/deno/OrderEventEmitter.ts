import type { IEventEmitter } from "./interfaces/IEventEmitter.ts";
import type { IObserver } from "./interfaces/IObserver.ts";
import type { IOrderEvent } from "./interfaces/IOrderEvent.ts";

export class OrderEventEmitter implements IEventEmitter {
  private observers: IObserver[] = [];

  attach(observer: IObserver): void {
    this.observers.push(observer);
  }

  detach(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  emit(data: IOrderEvent): void {
    this.observers.forEach((obs) => obs.notify(data));
  }
}
