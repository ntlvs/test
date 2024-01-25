type GameStatus = 'init' | 'bet' | 'spin' | 'result' | 'reward';
import { setTimeout } from 'node:timers/promises';
import { WheelInterface } from './wheel';
import { PlayerInterface } from './player';

export interface GameInterface {
  start(): Promise<void>
  placeBet(amount: number, space: number, placeBet: PlayerInterface): void
  rewards(space: number): void
}

export type PlayerBetType = {
  amount: number,
  space: number,
  player: PlayerInterface,
}

export class Game implements GameInterface {
  status: GameStatus
  wheel: WheelInterface
  bets: PlayerBetType[] = []
  winners: PlayerBetType[] = []

  constructor(wheel: WheelInterface) {
    this.status = 'init';
    this.wheel = wheel;
  }

  private setStatus(status: GameStatus): void {
    this.status = status;
  }

  private setBet(): void {
    this.setStatus('bet');
    console.log('Place your bets');
  }

  private spin(): void {
    this.setStatus('spin');
    console.log('The wheel is spinning...');
  }

  private getResult(): number {
    const result = this.wheel.spin();
    console.log(`${result} win!`);
    return result
  }

  placeBet(amount: number, space: number, player: PlayerInterface): void {
    if (this.status !== 'bet') throw new Error('Wrong game status');
    if (!this.wheel.getSpaceTypes().includes(space)) throw new Error('Wrong space type')
    this.bets.push({amount, space, player});
    console.log(`New bet from ${player.name}`);
  }

  rewards(space: number): void {
    const winners = this.bets.filter(el => el.space === space);
    this.winners.push(...winners);

    winners.forEach(e => {
      const prize = e.amount * e.space;
      console.log(`${e.player.name} win ${prize} coins!`);
      e.player.acceptReward(prize);
    });
  }

  async start(): Promise<void> {
    if (this.status !== 'init') throw new Error('Game is already started');

    this.setBet();
    await setTimeout(1500);
    this.spin();
    await setTimeout(500);

    const result = this.getResult();
    await setTimeout(100);
    this.rewards(result);
  }
}