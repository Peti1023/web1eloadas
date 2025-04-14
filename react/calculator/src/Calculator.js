function Calculator() {
    const [input, setInput] = React.useState("");
  
    const handleClick = (value) => {
      setInput(input + value);
    };
  
    const clearInput = () => {
      setInput("");
    };
  
    const calculateResult = () => {
      try {
        const result = eval(input);
        setInput(result.toString());
      } catch (error) {
        setInput("Error");
      }
    };
  
    return (
      <div>
        <h2>Calculator</h2>
        <input type="text" value={input} readOnly style={{ width: "100%", fontSize: "1.5em", marginBottom: "10px" }} />
        <div>
          {/* Számok és műveletek gombjai */}
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("+")}>+</button>
        </div>
        <div>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("-")}>-</button>
        </div>
        <div>
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("*")}>*</button>
        </div>
        <div>
          <button onClick={clearInput}>C</button>
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={calculateResult}>=</button>
          <button onClick={() => handleClick("/")}>/</button>
        </div>
      </div>
    );
  }
  