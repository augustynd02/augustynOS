import { createContext } from 'react';
import { Application } from '../../types/Application';

type AppContextType = {
    openApps: Application[];
    startApp: (app: Application) => void;
    closeApp: (id: string) => void;
    editAppName: (id: string, newName: string) => void;
    toggleMinimize: (id: string) => void;
}

const defaultContext: AppContextType = {
    openApps: [],
    startApp: () => { throw new Error("startApp called outside of AppContext.Provider"); },
    closeApp: () => { throw new Error("closeApp called outside of AppContext.Provider"); },
    editAppName: () => { throw new Error("editAppName called outside of AppContext.Provider"); },
    toggleMinimize: () => { throw new Error("toggleMinimize called outside of AppContext.Provider");}
};

const AppContext = createContext<AppContextType>(defaultContext);

export default AppContext;
