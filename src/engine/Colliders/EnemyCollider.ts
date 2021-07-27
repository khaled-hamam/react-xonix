import { Enemy } from "../Enemy";

export interface EnemyCollider {
  collideWithEnemy(enemy: Enemy, ...args: unknown[]): void;
}