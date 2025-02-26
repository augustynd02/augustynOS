import { Folder } from "../types/Folder";
import { File } from "../types/File";

const createFolder = (id: string, name: string, children: File[]): Folder => {
    return {
        id: id,
        name: name,
        type: "folder",
        iconURL: "https://winaero.com/blog/wp-content/uploads/2018/11/folder-icon-big-256.png",
        children: children
    }
}

export default createFolder;
