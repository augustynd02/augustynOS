import { Application } from '../types/Application';
import AppContext from './AppContext';
import { useState } from 'react';

export default function AppProvider({ children }: { children: React.ReactNode }) {
    const [openApps, setOpenApps] = useState<Application[]>([]);

    const startApp = (app: Application) => {
        setOpenApps(prev => [...prev, app]);
    }

    const closeApp = (id: string) => {
        setOpenApps(prev => prev.filter(openApp => openApp.id !== id));
    }

    const toggleMinimize = (id: string) => {
        setOpenApps(prev => prev.map(app =>
            app.id === id ? {...app, isMinimized: !app.isMinimized } : app
        ))
    }

    return (
        <AppContext.Provider value={{openApps, startApp, closeApp, toggleMinimize}}>
            { children }
        </AppContext.Provider>
    )
}
