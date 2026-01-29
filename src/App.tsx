import './App.css'
import {AnimatedCountdown} from "./components/Countdown.tsx";

function App() {

  return (
    <>
        <h1>До 20-летия похода осталось</h1>
        <AnimatedCountdown target={new Date("2026-07-13T06:00:00Z")} />
    </>
  )
}

export default App
