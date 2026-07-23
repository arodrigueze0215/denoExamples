import type { IObserver } from "../interfaces/IObserver.ts";
import type { IOrderEvent } from "../interfaces/IOrderEvent.ts";

export class DatabaseLogger implements IObserver {
  notify(data: IOrderEvent): void {
    console.log(`
      ========================================
      DATABASE LOGGER
      ----------------------------------------
      Order: ${data.id}
      Asset: ${data.asset}
      Price: ${data.price}
      Status: ${data.status}
      ----------------------------------------
      [ACTION]: Order has been logged to the database.
      ========================================
    `);
  }
}
