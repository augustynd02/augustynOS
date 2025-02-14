import Desktop from "./components/Desktop/Desktop"
import Taskbar from "./components/Taskbar/Taskbar"

import styles from './app.module.scss'
import './styles/main.scss'
import './styles/reset.scss'

import AppProvider from './contexts/AppProvider';
import { useState } from "react"
import { Icon } from "./types/Icon"
import createIcon from "./utils/createIcon"

function App() {
  const [icons, setIcons] = useState<Icon[]>([
    createIcon("Test", "test")
  ]);
  return (
    <AppProvider>
      <main className={styles.app} id="app" data-testid="app">
        <Desktop icons={icons} />
        <Taskbar />
      </main>
    </AppProvider>
  )
}

export default App
