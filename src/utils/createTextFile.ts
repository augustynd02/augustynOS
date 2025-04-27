import { TextFile } from "../types/TextFile";

const createTextFile = (id: string, name: string, content: string = ''): TextFile => {
    return {
        id: id,
        name: name,
        theme: 'light',
        type: "textfile",
        iconURL: "https://static.wikia.nocookie.net/logopedia/images/c/c4/Notepad_Vista_10.png",
        content: content
    }
}

export default createTextFile;
