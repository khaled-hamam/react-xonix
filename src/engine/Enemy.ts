import type { Collidable } from "./Collidable";
import { getRandomInt } from "../utils";
import { EnemyCollider } from "./Colliders/EnemyCollider";
import { Entity } from "./Entity";
import { Position } from "./Position";
import { Velocity } from "./Velocity";

type EnemyConstructorArgs = {
  position?: Position;
}

export class Enemy extends Entity implements Collidable<EnemyCollider> {
  public constructor(args?: EnemyConstructorArgs) {
    super(args?.position || new Position(), new Velocity({ dx: getRandomInt(-1, 1) || 1, dy: getRandomInt(-1, 1) || 1 }));
  }

  public collide(collider: EnemyCollider, ...args: unknown[]): this {
    collider.collideWithEnemy(this, ...args);
    return this;
  }

  public reflectYVelocity(): this {
    this.velocity = this.velocity.reflect({ x: false, y: true });
    return this;
  }

  public reflectXVelocity(): this {
    this.velocity = this.velocity.reflect({ x: true, y: true });
    return this;
  }
}