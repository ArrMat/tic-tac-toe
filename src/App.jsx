import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti';
import { TURNS } from './logic/constants';
import { checkWinner, checkEndGame } from './logic/logic';
import { Square } from './components/Square';
import { WinnerModal } from './components/WinnerModal';


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null); //null = no ha terminado el juego, false = empate

  

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null)
  }

  const updateBoard = (index) => {
    //chequea si la casilla esta ocupada
    if (board[index] || winner) return;
    //actualiza el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //chequea si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner){
      confetti();
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false) //empate
    }
  }
  

  return (
    <>
      <main className='board'>
        <h1>Ta te ti</h1>
        <button onClick={resetGame}>Reiniciar</button>
        <section className='game'>
          {
            board.map((squareValue, index) => {
              return (
                <Square key={index} index={index} updateBoard={updateBoard} >
                  {squareValue}
                </Square>
              )
            })
          }
        </section>
        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame}/>  

      </main>

    </>
  )
}

export default App
