import Desktop from "./components/Desktop/Desktop"
import Taskbar from "./components/Taskbar/Taskbar"

import styles from './app.module.scss'
import './styles/main.scss'
import './styles/reset.scss'

import AppProvider from './contexts/AppProvider';

function App() {
  return (
    <AppProvider>
      <main className={styles.app} id="app" data-testid="app">
        <Desktop />
        <Taskbar />
      </main>
    </AppProvider>
  )
}

export default App
