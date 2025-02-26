import { Application } from "../types/Application";
import { File } from "../types/File";

const createApp = (file: File):Application => {
    const app:Application = {
        id: file.id,
        file: file,
        isMinimized: false,
    }
    return app;
}

export default createApp;
