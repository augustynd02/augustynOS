import React, { useState } from "react";
import FileSystemContext from "./FileSystemContext";
import { FileSystem } from "../../types/FileSystem";

import createFolder from "../../utils/createFolder";
import createFile from "../../utils/createFile";

const defaultFileSystem: FileSystem = createFolder('root', "Root", [
    createFolder("desktop", "Desktop", [
        createFolder("folder1", "Test folder 1", []),
        createFile("file1", "Test file 1"),
        createFile("file2", "Test file 2"),
    ]),
])

export default function FileSystemProvider({ children } : { children: React.ReactNode}) {
    const [fileSystem, setFileSystem] = useState<FileSystem>(defaultFileSystem);
    return (
        <FileSystemContext.Provider value={{fileSystem}}>
            { children }
        </FileSystemContext.Provider>
    )
}
