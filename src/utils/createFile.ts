import { File } from "../types/File";

const createFile = (id: string, name: string, type: string = 'file', iconURL: string = "https://icon-library.com/images/windows-file-icon/windows-file-icon-16.jpg"): File => {
    return {
        id: id,
        name: name,
        type: type,
        iconURL: iconURL,
    }
}

export default createFile;
