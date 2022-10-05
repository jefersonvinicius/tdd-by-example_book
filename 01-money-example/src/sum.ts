import { Bank } from './bank';
import { Expression } from './expression';
import { Money } from './money';

export class Sum implements Expression {
  constructor(readonly augend: Expression, readonly addend: Expression) {}

  reduce(bank: Bank, to: string): Money {
    const amount = this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount;
    return new Money(amount, to);
  }

  times(multiplier: number) {
    return new Sum(this.augend.times(multiplier), this.addend.times(multiplier));
  }

  plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }
}
