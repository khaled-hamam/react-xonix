import { Position } from "./Position";
import { Velocity } from "./Velocity";

describe('Position', () => {
  it('should move correctly with velocity', () => {
    const position = new Position();
    const velocity = Velocity.right();

    const expectedPosition = new Position({ x: 1, y: 0 });

    const newPosition = position.move(velocity);

    expect(newPosition.equals(expectedPosition)).toBeTruthy();
  });
});