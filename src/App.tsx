import Desktop from "./components/Desktop/Desktop"
import Taskbar from "./components/Taskbar/Taskbar"

import styles from './app.module.scss'
import './main.scss'

function App() {
  return (
    <main className={styles.app} id="app" data-testid="app">
      <Desktop />
      <Taskbar />
    </main>
  )
}

export default App
