import { createContext } from 'react';
import { Application } from '../types/Application';

type AppContextType = {
    openApps: Application[];
    openApp: (app: Application) => void;
    closeApp: (app: Application) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
