import './App.css'
import { GameDataProvider } from './board/GameDataProvider'
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
          <GameDataProvider>
            <Board />
          </GameDataProvider>
        </div>
      </section>
    </>
  )
}

export default App
