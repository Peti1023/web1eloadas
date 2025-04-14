function TicTacToe() {
    // A 9 mezős rács, kezdetben minden elem null
    const [board, setBoard] = React.useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = React.useState(true);
  
    const handleClick = (index) => {
      // Ha a mező már foglalt vagy már van győztes, ne tegyük
      if (board[index] || calculateWinner(board)) return;
      const boardCopy = board.slice();
      boardCopy[index] = xIsNext ? "X" : "O";
      setBoard(boardCopy);
      setXIsNext(!xIsNext);
    };
  
    const renderSquare = (index) => {
      return (
        <button
          onClick={() => handleClick(index)}
          style={{ width: "60px", height: "60px", fontSize: "1.5em", margin: "2px" }}
        >
          {board[index]}
        </button>
      );
    };
  
    const winner = calculateWinner(board);
  
    return (
      <div>
        <h2>Tic Tac Toe</h2>
        {winner ? <p>Győztes: {winner}</p> : <p>Következő játékos: {xIsNext ? "X" : "O"}</p>}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div>{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}</div>
          <div>{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}</div>
          <div>{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}</div>
        </div>
      </div>
    );
  }
  
  // A nyertes kiszámoló segédfüggvény
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  