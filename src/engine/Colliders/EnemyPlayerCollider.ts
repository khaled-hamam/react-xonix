import type { EnemyCollider } from "./EnemyCollider";
import { Player } from "../Player";
import { Enemy } from "../Enemy";
import { EventsManager } from "../EventsManager";

export class EnemyPlayerCollider implements EnemyCollider {
  public collideWithEnemy(enemy: Enemy, player: Player): void {
    if (enemy.position.equals(player.position) === false) {
      return;
    }

    EventsManager.instance.emit('LOSE_LIFE');
  }
}