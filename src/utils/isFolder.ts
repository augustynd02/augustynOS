import { Folder } from "../types/Folder";
import { File } from "../types/File";

const isFolder = (item: File | Folder): item is Folder => {
    return item.type ==="folder";
}

export default isFolder;
