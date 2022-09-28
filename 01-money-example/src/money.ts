export class Money {
  constructor(protected amount: number) {}

  static dollar(amount: number): Dollar {
    return new Dollar(amount);
  }

  static franc(amount: number): Franc {
    return new Franc(amount);
  }

  equals(other: any): boolean {
    return this.constructor.name === other.constructor.name && this.amount === other.amount;
  }
}

import { Dollar } from './dollar';
import { Franc } from './franc';
