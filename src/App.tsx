import './App.css'
import { BoardProvider } from './board/BoardProvider'
import { Board } from './components/Board'

function App() {
  return (
    <>
      <section id="center">
        <div>
          <h1>2048</h1>
          <p>
            Use arrow keys to play the game
          </p>
        </div>
        <div>
          <BoardProvider>
            <Board />
          </BoardProvider>
        </div>
      </section>
    </>
  )
}

export default App
