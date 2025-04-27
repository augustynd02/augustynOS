import { TextFile } from "../types/TextFile";

const createTextFile = (id: string, name: string, content: string = ''): TextFile => {
    return {
        id: id,
        name: name,
        theme: 'light',
        type: "textfile",
        iconURL: "https://learn.microsoft.com/en-us/windows/win32/uxguide/images/vis-icons-image5.png",
        content: content
    }
}

export default createTextFile;
