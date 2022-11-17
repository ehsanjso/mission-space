import React from "react"
import Background from "./components/Background"
import Spaceship from "./components/Spaceship"
import Text from "./components/Text"

let timer
const easeInOutCubic = (t) => {
  return (0 - t) / 100
}

export default function App() {
  const [counterState, setCounter] = React.useState(100)
  React.useEffect(() => {
    clearInterval(timer)
    timer = setInterval(() => {
      if (counterState <= 0.4) {
        clearInterval(timer)
        return
      }
      setCounter((prev) => prev + easeInOutCubic(prev))
    }, 10)

    return () => clearInterval(timer)
  }, [counterState])

  return (
    <>
      <Background />
      <Text number={counterState} />
      <Spaceship number={counterState} />
    </>
  )
}
