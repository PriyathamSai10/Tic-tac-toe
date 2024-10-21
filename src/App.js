import "./App.css";
import { useState } from "react";

const players = ["X", "O"];

const App = () => {
  const [gridInfo, setGridInfo] = useState({
    vals: Array(9).fill(""),
    rows: [
      { X: 0, O: 0 },
      { X: 0, O: 0 },
      { X: 0, O: 0 },
    ],
    cols: [
      { X: 0, O: 0 },
      { X: 0, O: 0 },
      { X: 0, O: 0 },
    ],
    emptyCells: 9,
  });
  const [result, setResult] = useState("");
  const [next, setNext] = useState(0);
  const [playerSteps, setPlayerSteps] = useState({ X: "", O: "" });

  const checkDiagnoal = (vals) => {
    const XDiag1 = vals[0] === "X" && vals[4] === "X" && vals[8] === "X";
    const XDiag2 = vals[2] === "X" && vals[4] === "X" && vals[6] === "X";
    const ODiag1 = vals[0] === "O" && vals[4] === "O" && vals[8] === "O";
    const ODiag2 = vals[2] === "O" && vals[4] === "O" && vals[6] === "O";

    return XDiag1 || ODiag1 ? 1 : XDiag2 || ODiag2 ? 2 : -1;
  };

  const insertIntoRow = (id, rows, playerVal) => {
    const rowIdx = Math.floor(id / 3);
    rows[rowIdx][playerVal]++;

    return rows;
  };

  const insertIntoCol = (id, cols, playerVal) => {
    const colIdx = id % 3;
    cols[colIdx][playerVal]++;

    return cols;
  };

  const checkPattern = (gridInfo) => {
    const rowMatch = gridInfo.rows.some((x) =>
      Object.values(x).some((x) => x === 3)
    );
    const colsMatch = gridInfo.cols.some((x) =>
      Object.values(x).some((x) => x === 3)
    );
    const diagMatch = checkDiagnoal(gridInfo.vals);

    return rowMatch || colsMatch || diagMatch != -1;
  };

  const handleGridClick = (id) => {
    const playerVal = players[next];

    insertIntoRow(id, gridInfo.rows, playerVal);
    insertIntoCol(id, gridInfo.cols, playerVal);
    gridInfo.vals[id] = players[next];
    gridInfo.emptyCells--;

    const isPatternFound = checkPattern(gridInfo);

    if (isPatternFound) setResult(`Winner is: ${playerVal}`);
    else if (gridInfo.emptyCells === 0) setResult(`Tie`);

    setPlayerSteps(playerSteps);
    setGridInfo(gridInfo);
    setNext((prev) => (prev + 1) % players.length);
  };

  const handleReset = () => {
    setGridInfo({
      vals: Array(9).fill(""),
      emptyCells: 9,
      rows: [
        { X: 0, O: 0 },
        { X: 0, O: 0 },
        { X: 0, O: 0 },
      ],
      cols: [
        { X: 0, O: 0 },
        { X: 0, O: 0 },
        { X: 0, O: 0 },
      ],
    });
    setResult("");
    setPlayerSteps({ X: "", O: "" });
    setNext(0);
  };

  return (
    <div className="tic-tac-toe-wrapper">
      <p className="info">{result || `Next Player: ${players[next]}`}</p>

      <div className="container">
        {gridInfo.vals.map((x, idx) => (
          <button
            className="square"
            disabled={!!x || result}
            id={idx + 1}
            key={idx}
            onClick={() => handleGridClick(idx)}
          >
            {x}
          </button>
        ))}
      </div>

      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default App;
