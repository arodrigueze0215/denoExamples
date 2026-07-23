import type { IOrderEvent } from "./IOrderEvent.ts";

export interface IObserver {
  notify(data: IOrderEvent): void;
}
