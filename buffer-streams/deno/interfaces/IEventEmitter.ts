import type { IObserver } from "./IObserver.ts";
import type { IOrderEvent } from "./IOrderEvent.ts";

export interface IEventEmitter {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  emit(data: IOrderEvent): void;
}

