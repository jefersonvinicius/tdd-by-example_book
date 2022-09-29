import { Expression } from './expression';
import { Money } from './money';

export class Sum implements Expression {
  constructor(readonly augend: Money, readonly addend: Money) {}
}
