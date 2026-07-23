import type { IObserver } from "../interfaces/IObserver.ts";
import type { IOrderEvent } from "../interfaces/IOrderEvent.ts";

export class RiskManagerNotifier implements IObserver {
  notify(data: IOrderEvent): void {
    console.log(`
      ========================================
      RISK MANAGER NOTIFIER
      ----------------------------------------
      Order: ${data.id}
      Asset: ${data.asset}
      Price: ${data.price}
      Status: ${data.status}
      ----------------------------------------
      [ACTION]: Alert compliance team for manual review
      ========================================
    `);
  }
}
