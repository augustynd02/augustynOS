import Desktop from "./components/Desktop/Desktop"
import Taskbar from "./components/Taskbar/Taskbar"

function App() {
  return (
    <main data-testid="app">
      <Desktop />
      <Taskbar />
    </main>
  )
}

export default App
