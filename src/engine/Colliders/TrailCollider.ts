import type { EnemyCollider } from "./EnemyCollider";
import type { PlayerCollider } from "./PlayerCollider";
import { Player } from "../Player";
import { Enemy } from "../Enemy";
import { Grid } from "../Grid";
import { Cell } from "../Cell";
import { EventsManager } from "../EventsManager";

export class TrailCollider implements PlayerCollider, EnemyCollider {
  public collideWithPlayer(player: Player, grid: Grid): void {
    if (grid.getCell(player.position) === Cell.Trail) {
      player.applyVelocity('static');
      EventsManager.instance.emit('FILL_GRID');
    }
  }

  public collideWithEnemy(enemy: Enemy, grid: Grid): void {
    if (enemy.hasNeighbor(grid, Cell.Trail) === false) {
      return;
    }

    EventsManager.instance.emit('LOSE_LIFE');
  }
}