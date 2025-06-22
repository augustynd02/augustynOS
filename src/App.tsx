import { useContext, useState } from "react";
import Desktop from "./components/Desktop/Desktop";
import Taskbar from "./components/Taskbar/Taskbar";
import LoginScreen from "./components/LoginScreen/LoginScreen";

import styles from './app.module.scss';
import './styles/main.scss';
import './styles/reset.scss';

import ActionsModal from "./components/ActionsModal/ActionsModal";
import AppProvider from "./contexts/App/AppProvider";
import ActionsContext from "./contexts/Actions/ActionsContext";
import ActionsProvider from "./contexts/Actions/ActionsProvider";
import FileSystemProvider from "./contexts/FileSystem/FileSystemProvider";

// Separated content to access context
function AppContent() {
  const { handleCloseModal, modalPosition, isModalShown, actions } = useContext(ActionsContext);
  const [isLoginShown, setIsLoginShown] = useState<boolean>(true);

  return (
    <main className={styles.app} id="app" data-testid="app" onClick={handleCloseModal}>
      <Desktop/>
      <Taskbar />
      {isModalShown && <ActionsModal actions={actions} position={modalPosition} />}
      {isLoginShown && <LoginScreen setIsLoginShown={setIsLoginShown} />}
    </main>
  );
}

function App() {
  return (
    <FileSystemProvider>
      <AppProvider>
        <ActionsProvider>
          <AppContent />
        </ActionsProvider>
      </AppProvider>
    </FileSystemProvider>
  );
}

export default App;
