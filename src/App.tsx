import './App.css'
import { AnimatedCountdown } from "./components/AnimatedCountdown/AnimatedCountdown.tsx";
import Footer from "./components/Footer/Footer.tsx";

function App() {

  return (
    <div className={'main__container'}>
      <div className={'main__content'}>
        <h1>До 20-летия похода осталось</h1>
        <AnimatedCountdown target={new Date("2026-07-13T06:00:00Z")} />
      </div>
      <div className={'main__footer'}>
        <Footer />
      </div>
    </div>
  )
}

export default App
