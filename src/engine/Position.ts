import { ValueObject } from "./ValueObject";
import { Velocity } from "./Velocity";

type PositionConstructorArgs = {
  x: number;
  y: number;
}

export class Position implements ValueObject<Position> {
  public readonly x: number;
  public readonly y: number;

  public constructor(args?: PositionConstructorArgs) {
    this.x = args?.x || 0;
    this.y = args?.y || 0;
  }

  public move(velocity: Velocity): Position {
    return new Position({ x: this.x + velocity.dx, y: this.y + velocity.dy });
  }

  public left(): Position {
    return new Position({ x: this.x - 1, y: this.y });
  }

  public right(): Position {
    return new Position({ x: this.x + 1, y: this.y });
  }

  public up(): Position {
    return new Position({ x: this.x, y: this.y - 1 });
  }

  public down(): Position {
    return new Position({ x: this.x, y: this.y + 1 });
  }

  public equals(position: Position): boolean {
    return this.x === position.x && this.y === position.y;
  }
}