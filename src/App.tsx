import { useState, useEffect, memo } from "react";
import useInterval from "@use-it/interval";

import { Cell, XonixEngine } from "./engine";
import { useLazyRef } from "./useLazyRef";
import { getHighScore, setHighScore } from "./utils";

function App() {
  const engine = useLazyRef(() => new XonixEngine());

  const [grid, setGrid] = useState(engine.current.getFormattedCells());
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (engine.current.isRunning() === false) {
        return;
      }

      if (['ArrowLeft', 'ArrowDown', 'ArrowUp', 'ArrowRight'].includes(event.key)) {
        engine.current.handleButton(event.key.substr(5).toLowerCase() as any);
      }
    });
  }, [engine]);

  useInterval(() => {
    engine.current.tick();
    setGrid(engine.current.getFormattedCells());
    setHighScore(engine.current.grid.score);
  }, isRunning ? 40 : null);

  return (
    <div className="app p-4">
      <p className="footer">Coded with <span role="img" aria-label="love">❤️</span> by Khaled Mohamed</p>
      <div className="sidebar">
        <h1 className="mb-5">React Xonix</h1>
        <p>Life: <span className="badge badge-pill badge-dark">{ engine.current.player.lives }</span></p>
        <p>Score: <span className="badge badge-pill badge-dark">{ engine.current.grid.score }</span></p>
        <p>High Score: <span className="badge badge-pill badge-dark">{ getHighScore() }</span></p>

      </div>
      <div className="d-flex flex-column">
        { grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            { row.map((cell, colIndex) => <CellComponent key={`${rowIndex}|${colIndex}`} type={cell} />) }
          </div>
        )) }
        <button className="btn btn-lg btn-outline-secondary mt-4" onClick={() => {
            engine.current.start();
            setIsRunning(true);
          }}>Start</button>
      </div>
    </div>
  );
}

const colorMap = {
  [Cell.Void]: 'black',
  [Cell.Trail]: 'purple',
  [Cell.Wall]: 'grey',
  [Cell.Enemy]: 'red',
  [Cell.Player]: 'blue',
  [Cell.EnemyFlood]: 'black',
}

const CellComponent = memo((props: { type: Cell }) => {
  return <div style={{ width: '20px', height: '20px', backgroundColor: colorMap[props.type] }}></div>
});

export default App;
