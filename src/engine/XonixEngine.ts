import { Enemy } from "./Enemy"
import { Grid } from "./Grid";
import { Player } from "./Player";
import { Position } from "./Position";
import { getRandomInt } from "../utils";
import { WallCollider } from "./Colliders/WallCollider";
import { TrailCollider } from "./Colliders/TrailCollider";
import { Cell } from "./Cell";
import { EnemyPlayerCollider } from "./Colliders/EnemyPlayerCollider";
import { EventsManager } from "./EventsManager";

type GameState = 'STOPPED' | 'RUNNING';

type GameConfig = {
  enemyCount?: number;
}

export class XonixEngine {
  public grid!: Grid;

  public player!: Player;
  public enemies!: Enemy[];

  private state!: GameState;

  private wallCollider = new WallCollider();
  private trailCollider = new TrailCollider();
  private enemyPlayerCollider = new EnemyPlayerCollider();

  public constructor(config?: GameConfig) {
    this.resetGame(config);

    EventsManager.instance
      .on('FILL_GRID', () => this.grid.fill(this.enemies))
      .on('LOSE_LIFE',() => {
        this.grid.resetTrail();
        this.player.loseLife();

        if (this.player.lives === 0) {
          this.resetGame(config);
        }
      });
  }

  private resetGame(config?: GameConfig) {
    const GRID_WIDTH = 50;
    const GRID_HEIGHT = 30;

    this.stop();

    this.player = new Player();
    this.enemies = new Array(config?.enemyCount ?? 5).fill(undefined).map(() => {
      return new Enemy({
        position: new Position({ x: getRandomInt(3, GRID_WIDTH - 2), y: getRandomInt(3, GRID_HEIGHT - 2) }),
      });
    });

    this.grid = new Grid({ width: GRID_WIDTH, height: GRID_HEIGHT });
  }

  public tick() {
    if (this.state !== 'RUNNING') {
      return;
    }

    this.player.move(this.grid);
    this.enemies.forEach(enemy => enemy.move(this.grid));

    this.player
      .collide(this.wallCollider, this.grid)
      .collide(this.trailCollider, this.grid);

    this.enemies.forEach(enemy => {
      enemy
        .collide(this.wallCollider, this.grid)
        .collide(this.trailCollider, this.grid)
        .collide(this.enemyPlayerCollider, this.player);
    });

    if (this.grid.getCell(this.player.position) === Cell.Void) {
      this.grid.setCell(this.player.position, Cell.Trail);
    }
  }

  public getFormattedCells(): Cell[][] {
    return this.grid.getFormattedCells(this.player, this.enemies);
  }

  public handleButton(button: 'up' | 'down' | 'left' | 'right') {
    this.player.applyVelocity(button);
  }

  public start() {
    this.state = 'RUNNING';
  }

  public stop() {
    this.state = 'STOPPED';
  }

  public isRunning() {
    return this.state === 'RUNNING';
  }
}