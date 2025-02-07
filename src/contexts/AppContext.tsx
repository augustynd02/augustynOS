import { createContext } from 'react';
import { Application } from '../types/Application';

type AppContextType = {
    openApps: Application[];
    startApp: (app: Application) => void;
    closeApp: (app: Application) => void;
}

const defaultContext: AppContextType = {
    openApps: [],
    startApp: () => { throw new Error("startApp called outside of AppContext.Provider"); },
    closeApp: () => { throw new Error("closeApp called outside of AppContext.Provider"); }
};

const AppContext = createContext<AppContextType>(defaultContext);

export default AppContext;
