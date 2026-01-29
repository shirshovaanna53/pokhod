import './App.css'
import {AnimatedCountdown} from "./components/Countdown.tsx";

function App() {

  return (
    <>
        <AnimatedCountdown target={new Date("2026-07-13T09:00:00Z")} />
    </>
  )
}

export default App
