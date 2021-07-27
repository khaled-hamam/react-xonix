import { Player } from "../Player";

export interface PlayerCollider {
  collideWithPlayer(player: Player, ...args: unknown[]): void;
}