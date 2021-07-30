import type { EnemyCollider } from "./EnemyCollider";
import type { PlayerCollider } from "./PlayerCollider";
import { Player } from "../Player";
import { Enemy } from "../Enemy";
import { Grid } from "../Grid";
import { Cell } from "../Cell";
import { EventsManager } from "../EventsManager";

export class WallCollider implements PlayerCollider, EnemyCollider {
  public collideWithPlayer(player: Player, grid: Grid): void {
    if (grid.getCell(player.position) === Cell.Wall) {
      player.applyVelocity('static');
      EventsManager.instance.emit('FILL_GRID');
    }
  }

  public collideWithEnemy(enemy: Enemy, grid: Grid): void {
    if (enemy.hasNeighbor(grid, Cell.Wall) === false) {
      return;
    }

    if (
      grid.getCell(enemy.position.left()) === Cell.Wall ||
      grid.getCell(enemy.position.right()) === Cell.Wall
    ) {
      enemy.reflectXVelocity();
    }

    if (
      grid.getCell(enemy.position.up()) === Cell.Wall ||
      grid.getCell(enemy.position.down()) === Cell.Wall
    ) {
      enemy.reflectYVelocity();
    }
  }
}