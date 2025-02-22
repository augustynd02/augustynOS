import { useState, useContext } from "react";
import Desktop from "./components/Desktop/Desktop";
import Taskbar from "./components/Taskbar/Taskbar";

import styles from './app.module.scss';
import './styles/main.scss';
import './styles/reset.scss';

import { Icon } from "./types/Icon";
import createIcon from "./utils/createIcon";
import ActionsModal from "./components/ActionsModal/ActionsModal";
import AppProvider from "./contexts/App/AppProvider";
import ActionsContext from "./contexts/Actions/ActionsContext";
import ActionsProvider from "./contexts/Actions/ActionsProvider";

// Separated content to access context
function AppContent() {
  const { handleCloseModal, modalPosition, isModalShown, actions } = useContext(ActionsContext);

  const [icons, setIcons] = useState<Icon[]>([
    createIcon("Test", "test"),
    createIcon("Folder", "folder", "https://winaero.com/blog/wp-content/uploads/2018/11/folder-icon-big-256.png")
  ]);

  return (
    <main className={styles.app} id="app" data-testid="app" onClick={handleCloseModal}>
      <Desktop icons={icons} />
      <Taskbar />
      {isModalShown && <ActionsModal actions={actions} position={modalPosition} />}
    </main>
  );
}

function App() {
  return (
    <AppProvider>
      <ActionsProvider>
        <AppContent />
      </ActionsProvider>
    </AppProvider>
  );
}

export default App;
