import './App.css'
import { GameDataProvider } from './data/GameDataProvider'
import { Board } from './components/Board'
import { GameStatus } from './components/GameStatus'

function App() {
  return (
    <GameDataProvider>
      <section id="center">
        <GameStatus />
        <Board />
      </section>
    </GameDataProvider>
  )
}

export default App
