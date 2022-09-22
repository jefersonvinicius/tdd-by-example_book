export class Money {
  constructor(protected amount: number) {}

  equals(other: any): boolean {
    return this.amount === other.amount;
  }
}
