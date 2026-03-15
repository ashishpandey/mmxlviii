import './App.css'
import { GameDataProvider } from './data/GameDataProvider'
import { Board } from './components/Board'
import { GameStatus } from './components/GameStatus'
import { HintProvider } from './components/HintProvider'

function App() {
  return (
    <GameDataProvider>
      <section id="center">
        <GameStatus />
        <Board />
        <HintProvider />
      </section>
    </GameDataProvider>
  )
}

export default App
