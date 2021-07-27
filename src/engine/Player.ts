import type { Collidable } from "./Collidable";
import { PlayerCollider } from "./Colliders/PlayerCollider";
import { Entity } from "./Entity";
import { Position } from "./Position";
import { Velocity } from "./Velocity";

type PlayerConstructorArgs = {
  position?: Position;
}

export class Player extends Entity implements Collidable<PlayerCollider> {
  public lives: number;

  public constructor(args?: PlayerConstructorArgs) {
    super(args?.position || new Position(), Velocity.static());
    this.lives = 3;
  }

  public collide(collider: PlayerCollider, ...args: unknown[]): this {
    collider.collideWithPlayer(this, ...args);
    return this;
  }

  public applyVelocity(direction: 'up' | 'down' | 'left' | 'right' | 'static'): this {
    this.velocity = Velocity[direction]();
    return this;
  }

  public loseLife() {
    if (this.lives === 0) {
      throw new Error('Player already lost the game.');
    }

    this.lives -= 1;
    this.position = new Position();
  }
}
