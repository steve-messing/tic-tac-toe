import React from "react";

const square = "square";

function Square({value, onSquareClick}) {
  return (
    <button className={square} onClick={onSquareClick}>
      {value}
    </button>
  );
}  

function Board() {
  const emptyBoard = Array(9).fill(null);
  const [squares, setSquares] = React.useState(emptyBoard);
  const [xIsNext, setXIsNext] = React.useState(true);
  
  const winner = declareWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }
  
  function handleClick(i) {
    if (squares[i] || declareWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(emptyBoard);
    setXIsNext(true);
  }

  return (
    <>
    <div>{status}</div>
    <div className="board">
      <div>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>
      <button onClick={handleReset}>Reset Board</button>
    </>
  );
}

function declareWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function TicTacToe() {
  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
}

export default TicTacToe;
