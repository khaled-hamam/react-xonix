export interface Collidable<T> {
  collide(collider: T, ...args: unknown[]): Collidable<T>;
}