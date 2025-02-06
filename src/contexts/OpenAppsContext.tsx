import { createContext } from 'react';
import { Application } from '../interfaces/Application';

interface OpenAppsContext {
    openApps: Application[];
}

const OpenAppsContext = createContext<Application[]>([]);

export default OpenAppsContext;
