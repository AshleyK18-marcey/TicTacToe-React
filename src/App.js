//useState can be called from the component to "remember" things
import { useState } from 'react'

//component with property, must use brackets to call variable
function Square({ value, onSquareClick }) {
  //states for a individual square, values stores the value and setValue is a function that can change the value.
  //null passed as initial state
  //const [value, setValue] = useState(null);
  //interactive component
  // function handleClick(){
  //setValue('X');
  //each square has its own state 
  //}

  return (<button className="square" onClick={onSquareClick}> {value} </button>);
}


// creates a component - used to reder, mamange and update ui elements
// export keyword makes it accessible outside of this file
// default keyword tells other files using the code that is the main function in the file
// button is a JSX element - combination of javascript and html tags
// value is defined by the property of the square component
// <Square value="1" />
// To keep track of the game the use state should be moved into the parent
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [game, setGame] = useState(false);
  let status = "Welcome! Press 'Start Game' to get started";

  function handleStartClick() {
    setGame(true);
    return;
  }
  function handleSquareClick(i) {
    //check if theres already a value for the square
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    //creates a copy of the squares array
    const nextSquares = squares.slice();
    // immutability makes complex features easier to implement
    // avoiding direct data mutation allows for the tracking of previous versions
    //immutability makes it very cheap for components to compare whether their daa has changes or not

    //updates the nextSquares array to add X or O to the ith square
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    //calling the setSquares function lets react know the state of the component has changes
    // this will trigger re render of the components that use the squares states (the board)
    // as well as its child components (the squares that make up the board)
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    // () => is an arrow function, when the square is clicked the code after => will run
  }
  if (game) {
    const winner = calculateWinner(squares);

    if (winner == "X" || winner == "O") {
      status = "Winner: " + winner;
    } else if (winner == null) {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
    else {
      status = "Its a draw!";
    }
  }

  return (
    // <> Fragments wrap multiple adjacent JSX elements
    <>
      <h1 className="status">{status}</h1>
      <div className="btn-container">
        <button className="btn" onClick={() => handleStartClick()}><span>Start Game</span></button>
        <button className="btn" onClick={() => window.location.reload(false)}><span>New Game</span></button>
      </div>

      <div className="contain">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
        </div>
      </div>


    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let empty = false;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    else if (squares[a] == null || squares[b] == null || squares[c] == null) {
      empty = true;
    }
  }
  if (empty) {
    return null;
  }
  return "none";
}
