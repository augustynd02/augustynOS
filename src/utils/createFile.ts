import { File } from "../types/File";

const createFile = (id: string, name: string, iconURL: string = "https://icon-library.com/images/windows-file-icon/windows-file-icon-16.jpg"): File => {
    return {
        id: id,
        name: name,
        type: "file",
        iconURL: iconURL,
    }
}

export default createFile;
