import { Grid } from "./Grid";
import { Player } from "./Player"
import { Position } from "./Position";

describe('Player', () => {
  const grid = new Grid({ height: 100, width: 100 });

  it('should start with 3 lives', () => {
    expect(new Player().lives).toBe(3);
  });

  it('should start with zero velocity', () => {
    const position = new Player().move(grid).position;

    expect(position.equals(new Position())).toBeTruthy();
  });
})