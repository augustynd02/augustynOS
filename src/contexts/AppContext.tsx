import React, { createContext, useState } from 'react';
import { Application } from '../interfaces/Application';

type AppContextType = {
    openApps: Application[];
    openApp: (app: Application) => void;
    closeApp: (app: Application) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: React.ReactNode }) {
    const [openApps, setOpenApps] = useState<Application[]>([]);

    const openApp = (app: Application) => {
        setOpenApps(prev => [...prev, app]);
    }

    const closeApp = (app: Application) => {
        setOpenApps(prev => prev.filter(openApp => openApp.id !== app.id));
    }

    return (
        <AppContext.Provider value={{openApps, openApp, closeApp}}>
            { children }
        </AppContext.Provider>
    )
}
