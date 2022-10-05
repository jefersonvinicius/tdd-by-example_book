import { describe, expect, it } from 'vitest';
import { Money } from '@app/money';
import { Bank } from '@app/bank';
import { Sum } from '@app/sum';
import { Expression } from '@app/expression';

describe('Dollar suite test', () => {
  it('dollar multiplication', () => {
    const five = Money.dollar(5);
    expect(Money.dollar(10).equals(five.times(2))).toBe(true);
    expect(Money.dollar(15).equals(five.times(3))).toBe(true);
  });

  it('franc multiplication', () => {
    const five = Money.franc(5);
    expect(Money.franc(10).equals(five.times(2))).toBe(true);
    expect(Money.franc(15).equals(five.times(3))).toBe(true);
  });

  it('simple addition', () => {
    const five = Money.dollar(5);
    const sum = five.plus(five);
    const bank = new Bank();
    const reduced = bank.reduce(sum, 'USD');
    expect(reduced.equals(Money.dollar(10)));
  });

  it('plus returns sum', () => {
    const five = Money.dollar(5);
    const result = five.plus(five);
    const sum = result as Sum;
    expect(five.equals(sum.augend)).toBe(true);
    expect(five.equals(sum.addend)).toBe(true);
  });

  it('sum plus money', () => {
    const fiveBucks = Money.dollar(5);
    const tenFrancs = Money.franc(10);
    const bank = new Bank();
    bank.addRate('CHF', 'USD', 2);
    const sum = new Sum(fiveBucks, tenFrancs).plus(fiveBucks);
    const result = bank.reduce(sum, 'USD');
    expect(result.equals(Money.dollar(15))).toBe(true);
  });

  it('sum times', () => {
    const fiveBucks = Money.dollar(5);
    const tenFrancs = Money.franc(10);
    const bank = new Bank();
    bank.addRate('CHF', 'USD', 2);
    const sum = new Sum(fiveBucks, tenFrancs).times(2);
    const result = bank.reduce(sum, 'USD');
    expect(Money.dollar(20).equals(result)).toBe(true);
  });

  it('reduce sum', () => {
    const sum = new Sum(Money.dollar(3), Money.dollar(4));
    const bank = new Bank();
    const result = bank.reduce(sum, 'USD');
    expect(result.equals(Money.dollar(7))).toBe(true);
  });

  it('reduce money', () => {
    const bank = new Bank();
    const result = bank.reduce(Money.dollar(1), 'USD');
    expect(result.equals(Money.dollar(1))).toBe(true);
  });

  it('identify rate', () => {
    expect(new Bank().rate('USD', 'USD')).toBe(1);
  });

  it('mixed addition', () => {
    const fiveBucks: Expression = Money.dollar(5);
    const tenFrancs: Expression = Money.franc(10);
    const bank = new Bank();
    bank.addRate('CHF', 'USD', 2);
    const result = bank.reduce(fiveBucks.plus(tenFrancs), 'USD');
    expect(result.equals(Money.dollar(10))).toBe(true);
  });

  it('reduce money different currency', () => {
    const bank = new Bank();
    bank.addRate('CHF', 'USD', 2);
    const result = bank.reduce(Money.franc(2), 'USD');
    expect(result.equals(Money.dollar(1))).toBe(true);
  });

  it('equality', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
    expect(Money.franc(5).equals(Money.dollar(5))).toBe(false);
  });

  it('currency', () => {
    expect(Money.dollar(1).currency).toBe('USD');
    expect(Money.franc(1).currency).toBe('CHF');
  });
});
