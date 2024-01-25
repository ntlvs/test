import { wheelConfig } from "./config";
import { Game } from "./game";
import { Player } from "./player";
import { Wheel } from "./wheel";

const wheel = new Wheel(wheelConfig);
const game = new Game(wheel);
const player = new Player('testPlayer');
const player1 = new Player('testPlayer1');

game.start();

player.bet(game, 10, 2);
player1.bet(game,20, 2);
