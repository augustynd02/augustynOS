import { useState } from "react"

import Desktop from "./components/Desktop/Desktop"
import Taskbar from "./components/Taskbar/Taskbar"

import OpenAppsContext from "./contexts/AppContext"

import { OpenApp } from "./interfaces/Application"

import styles from './app.module.scss'
import './styles/main.scss'
import './styles/reset.scss'

function App() {
  const [openApps, setOpenApps] = useState<OpenApp[]>([])

  return (
    <OpenAppsContext.Provider value={openApps}>
      <main className={styles.app} id="app" data-testid="app">
        <Desktop />
        <Taskbar />
      </main>
    </OpenAppsContext.Provider>
  )
}

export default App
