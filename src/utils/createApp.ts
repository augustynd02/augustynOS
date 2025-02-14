import { Application } from "../types/Application";

const createApp = (name: string, type: string, iconURL: string = "https://static.thenounproject.com/png/5018320-200.png"):Application => {
    const app:Application = {
        id: Date.now().toString(),
        name: name,
        type: type,
        iconURL: iconURL,
        isMinimized: false,
    }
    return app;
}

export default createApp;
