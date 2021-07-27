import { Cell } from "./Cell";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { Position } from "./Position";

type GridOptions = {
  width: number,
  height: number,
}

export class Grid {
  private height: number;
  private width: number;
  private cells: Cell[][];
  private initialWalls: number;

  public constructor(options: GridOptions) {
    this.height = options.height;
    this.width = options.width;
    this.initialWalls = 0;

    // FIXME: What happened here?
    // this.cells = new Array(this.height).fill(new Array(this.width).fill(Cell.Void));
    
    this.cells = new Array(this.height);
    
    for (let i = 0; i < this.height; ++i) {
      this.cells[i] = new Array(this.width);
      
      for (let j = 0; j < this.width; ++j) {
        if (i === 0 || i === this.height - 1 || j === 0 || j === this.width - 1) {
          this.cells[i][j] = Cell.Wall;
          this.initialWalls += 1;
        } else {
          this.cells[i][j] = Cell.Void;
        }
      }
    }
  }

  public getCell(position: Position): Cell {
    if (this.isWithinBounds(position) === false) {
      return Cell.Wall;
    }

    return this.cells[position.y][position.x];
  }

  public setCell(position: Position, cell: Cell) {
    this.cells[position.y][position.x] = cell;
  }

  public getFormattedCells(player: Player, enemies: Enemy[]) {
    const formattedCells = this.cells.map(row => [...row]);

    formattedCells[player.position.y][player.position.x] = Cell.Player;
    enemies.forEach(enemy => {
      formattedCells[enemy.position.y][enemy.position.x] = Cell.Enemy;
    });

    return formattedCells;
  }

  public fill(enemies: Enemy[]) {
    enemies.forEach(enemy => this.flood(enemy.position));

    for (let i = 0; i < this.height; ++i) {
      for (let j = 0; j < this.width; ++j) {
        if (this.cells[i][j] !== Cell.EnemyFlood) {
          this.cells[i][j] = Cell.Wall;
        } else {
          this.cells[i][j] = Cell.Void;
        }
      }
    }
  }

  public resetTrail() {
    for (let i = 0; i < this.height; ++i) {
      for (let j = 0; j < this.width; ++j) {
        if (this.cells[i][j] === Cell.Trail) {
          this.cells[i][j] = Cell.Void;
        }
      }
    }
  }

  public get score() {
    let score = 0;

    for (let i = 0; i < this.height; ++i) {
      for (let j = 0; j < this.width; ++j) {
        if (this.cells[i][j] === Cell.Wall) {
          score += 1;
        }
      }
    }

    return score - this.initialWalls;
  }

  private flood(position: Position) {
    if (this.getCell(position) !== Cell.Void) {
      return;
    }

    this.setCell(position, Cell.EnemyFlood);

    this.flood(position.up());
    this.flood(position.down());
    this.flood(position.left());
    this.flood(position.right());
  }

  public isWithinBounds(position: Position): boolean {
    return position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height;
  }
}