import { Expression } from './expression';
import { Money } from './money';

export class Bank {
  private rates = new Map<string, number>();

  addRate(from: string, to: string, rate: number) {
    this.rates.set(`${from}-${to}`, rate);
  }

  reduce(expression: Expression, to: string): Money {
    return expression.reduce(this, to);
  }

  rate(from: string, to: string) {
    return this.rates.get(`${from}-${to}`) ?? 1;
  }
}
