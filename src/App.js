//useState can be called from the component to "remember" things
import { useState } from 'react'

//component with property, must use brackets to call variable
function Square ({ value, onSquareClick }) {
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

  function handleClick(i){
    //check if theres already a value for the square
    if (squares[i] || calculateWinner(squares)){
      return;
    }
    //creates a copy of the squares array
    const nextSquares = squares.slice();
    // immutability makes complex features easier to implement
    // avoiding direct data mutation allows for the tracking of previous versions
    //immutability makes it very cheap for components to compare whether their daa has changes or not

    //updates the nextSquares array to add X or O to the ith square
    if (xIsNext){
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
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    // <> Fragments wrap multiple adjacent JSX elements
    <>
    <div classname="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> 
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
      <button onClick={() => window.location.reload(false)}>New Game</button>
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Restart(){

}