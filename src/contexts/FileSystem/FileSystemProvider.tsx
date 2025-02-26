import React, { useState } from "react";
import FileSystemContext from "./FileSystemContext";
import { FileSystem } from "../../types/FileSystem";

import createFolder from "../../utils/createFolder";
import createFile from "../../utils/createFile";
import { Folder } from "../../types/Folder";

const defaultFileSystem: FileSystem = createFolder('root', "Root", [
    createFolder("desktop", "Desktop", [
        createFolder("folder1", "Test folder 1", []),
        createFile("file1", "Test file 1"),
        createFile("file2", "Test file 2"),
    ]),
])

export default function FileSystemProvider({ children } : { children: React.ReactNode}) {
    const [fileSystem, setFileSystem] = useState<FileSystem>(defaultFileSystem);

    const getFolder = (id: string): Folder | undefined => {
        return fileSystem.children.find((item) => item.id === id) as Folder;
    };

    return (
        <FileSystemContext.Provider value={{fileSystem, getFolder}}>
            { children }
        </FileSystemContext.Provider>
    )
}
