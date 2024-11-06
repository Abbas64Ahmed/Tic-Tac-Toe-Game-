import Player from "./components/player.jsx";
import GameBoard from "./components/gameBoard.jsx";
import Log from "./components/log.jsx";
import GameOver from "./components/gameOver.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = {
  x: "player 1",
  o: "player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "x";
  if (gameTurns.length > 0 && gameTurns[0].player === "x") {
    currentPlayer = "o";
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  let [players, setPlayer] = useState(PLAYERS);
  let [gameTurns, setGameTurns] = useState([]);
  // let [activePlayer, setActivePlayer] = useState("x");

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...INITIAL_GAME_BOARD.map((e) => [...e])];

  for (const turn of gameTurns) {
    let { square, player } = turn;
    let { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner = deriveWinner(gameBoard, players);

  let hasDraw = gameTurns.length === 9 && !winner;
  console.log(hasDraw);

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer(activePlayer === "x" ? "o" : "x");

    setGameTurns((prevTurn) => {
      let currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurn = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurn];
      return updatedTurn;
    });
  }

  function handleReplay() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayer((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            InitialName={PLAYERS.x}
            symbol="x"
            isActive={activePlayer === "x"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            InitialName={PLAYERS.o}
            symbol="o"
            isActive={activePlayer === "o"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleReplay} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
