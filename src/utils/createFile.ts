import { File } from "../types/File";

const createFile = (id: string, name: string,): File => {
    return {
        id: id,
        name: name,
        type: "file",
        iconURL: "testurl",
    }
}

export default createFile;
