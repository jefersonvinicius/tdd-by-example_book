export class Money {
  constructor(protected amount: number, protected _currency: string) {}

  static dollar(amount: number): Money {
    return new Money(amount, 'USD');
  }

  static franc(amount: number): Money {
    return new Money(amount, 'CHF');
  }

  get currency() {
    return this._currency;
  }

  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }

  equals(other: any): boolean {
    return this.currency === other.currency && this.amount === other.amount;
  }
}
