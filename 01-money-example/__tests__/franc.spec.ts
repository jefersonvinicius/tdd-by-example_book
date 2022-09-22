import { describe, expect, it } from 'vitest';
import { Franc } from '@app/franc';

describe('Franc suite test', () => {
  it('multiplication', () => {
    const five = new Franc(5);
    expect(five.times(2).equals(new Franc(10))).toBe(true);
    expect(five.times(3).equals(new Franc(15))).toBe(true);
  });

  it('equality', () => {
    expect(new Franc(5).equals(new Franc(5))).toBe(true);
    expect(new Franc(5).equals(new Franc(6))).toBe(false);
  });
});
