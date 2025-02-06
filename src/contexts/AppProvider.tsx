import { Application } from '../types/Application';
import AppContext from './AppContext';
import { useState } from 'react';

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
