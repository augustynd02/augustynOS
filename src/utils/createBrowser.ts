import { Browser } from "../types/Browser";

const createBrowser = (id: string, name: string, iconUrl?: string, initialUrl?: string): Browser => {
    return {
        id: id,
        name: name,
        type: "browser",
        iconURL: iconUrl || 'https://cdn-icons-png.freepik.com/512/4387/4387430.png',
        initialUrl: initialUrl
    }
}

export default createBrowser;
