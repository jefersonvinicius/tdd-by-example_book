import { Expression } from './expression';
import { Sum } from './sum';

export class Money implements Expression {
  constructor(readonly amount: number, protected _currency: string) {}

  static dollar(amount: number): Money {
    return new Money(amount, 'USD');
  }

  static franc(amount: number): Money {
    return new Money(amount, 'CHF');
  }

  get currency() {
    return this._currency;
  }

  plus(addend: Money): Expression {
    return new Sum(this, addend);
  }

  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }

  equals(other: any): boolean {
    return this.currency === other.currency && this.amount === other.amount;
  }
}
