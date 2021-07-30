import { Cell } from "./Cell";
import { Grid } from "./Grid";
import { Position } from "./Position";
import { Velocity } from "./Velocity";

export abstract class Entity {
  public constructor(public position: Position, protected velocity: Velocity) {}

  public move(grid: Grid): this {
    const newPosition = this.position.move(this.velocity);

    if (grid.isWithinBounds(newPosition) && this.isValidPositionHook(newPosition, grid)) {
      this.position = newPosition;
    }

    return this;
  }

  protected isValidPositionHook(newPosition: Position, grid: Grid): boolean {
    return true;
  }

  public hasNeighbor(grid: Grid, cell: Cell) {
    const neighborCells = [
      grid.getCell(this.position.up()),
      grid.getCell(this.position.down()),
      grid.getCell(this.position.left()),
      grid.getCell(this.position.right()),


      grid.getCell(this.position.up().left()),
      grid.getCell(this.position.up().right()),

      grid.getCell(this.position.down().left()),
      grid.getCell(this.position.down().right()),
    ];

    return neighborCells.includes(cell);
  } 
}