import { File } from "./File";

export type Application = {
    id: string;
    file: File,
    isMinimized: boolean;
}
