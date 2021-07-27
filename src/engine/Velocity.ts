import { ValueObject } from "./ValueObject";

type VelocityConstructorArgs = {
  dx: number;
  dy: number;
}

export class Velocity implements ValueObject<Velocity> {
  public readonly dx: number;
  public readonly dy: number;

  public constructor(args?: VelocityConstructorArgs) {
    this.dx = args?.dx || 0;
    this.dy = args?.dy || 0;
  }
  public equals(velocity: Velocity): boolean {
    return this.dx === velocity.dx && this.dy === velocity.dy;
  }

  public reflect(options: { x: boolean, y: boolean }): Velocity {
    const newDx = options.x ? this.dx * -1 : this.dx;
    const newDy = options.y ? this.dy * -1 : this.dy;

    return new Velocity({ dx: newDx, dy: newDy });
  }

  static up(): Velocity {
    return new Velocity({ dx: 0, dy: -1 });
  }

  static down(): Velocity {
    return new Velocity({ dx: 0, dy: 1 });
  }

  static left(): Velocity {
    return new Velocity({ dx: -1, dy: 0 });
  }

  static right(): Velocity {
    return new Velocity({ dx: 1, dy: 0 });
  }

  static static(): Velocity {
    return new Velocity({ dx: 0, dy: 0 });
  }
}