import Desktop from "./components/Desktop/Desktop"
import Taskbar from "./components/Taskbar/Taskbar"

import styles from './app.module.scss'
import './styles/main.scss'
import './styles/reset.scss'

import AppProvider from './contexts/AppProvider';
import { useState } from "react"
import { Application } from './types/Application';

function App() {
  const [icons, setIcons] = useState<Application[]>([
    {
      id: Date.now().toString(),
      name: "Test",
      type: "Test",
      iconURL: 'https://cdn.iconscout.com/icon/free/png-256/free-email-icon-download-in-svg-png-gif-file-formats--envenlope-letter-mail-user-interface-pack-icons-83578.png'
    }
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
