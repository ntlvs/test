import { GameInterface } from "./game";

export type BetType = {
  amount: number,
  space: number,
}

export interface PlayerInterface {
  name: string
  acceptReward(amount: number): void
}

export class Player implements PlayerInterface {
  name: string
  balance: number
  bets: BetType[] = [];

  constructor(name: string, initBalance: number = 100) {
    this.name = name;
    this.balance = initBalance;
  }

    bet(game: GameInterface, amount: number, space: number): void {
    if(this.balance - amount < 0) throw new Error('Low funds');
    this.balance -= amount;

    try {
      game.placeBet(amount, space, this);
    } catch (error) {
      this.balance += amount;
      if (error instanceof Error)
        console.log(`Can't to place a bet`, error.message);
    }

    this.bets.push({amount, space});
  }

  acceptReward(amount: number): void {
    this.balance += amount;
  }
}