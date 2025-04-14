const { useState } = React;

// Fő komponens, ami a menük és az alkalmazások váltását kezeli.
function App() {
  const [currentApp, setCurrentApp] = useState("calculator");

  const renderApp = () => {
    if (currentApp === "calculator") return <Calculator />;
    if (currentApp === "tictactoe") return <TicTacToe />;
  };

  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setCurrentApp("calculator")}>Calculator</button>
        <button onClick={() => setCurrentApp("tictactoe")}>Tic Tac Toe</button>
      </nav>
      <div>
        {renderApp()}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
