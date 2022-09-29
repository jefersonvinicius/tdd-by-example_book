import { Expression } from './expression';
import { Money } from './money';
import { Sum } from './sum';

export class Bank {
  reduce(expression: Expression, to: string) {
    const sum = expression as Sum;
    const amount = sum.augend.amount + sum.addend.amount;
    return new Money(amount, to);
  }
}
