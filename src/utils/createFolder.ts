import { Folder } from "../types/Folder";
import { File } from "../types/File";

const createFolder = (id: string, name: string, children: File[]): Folder => {
    return {
        id: id,
        name: name,
        type: "folder",
        iconURL: "testurl",
        children: children
    }
}

export default createFolder;
