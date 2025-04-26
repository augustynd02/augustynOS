import React, { useState } from "react";
import FileSystemContext from "./FileSystemContext";
import { FileSystem } from "../../types/FileSystem";

import createFolder from "../../utils/createFolder";
import createFile from "../../utils/createFile";
import createBrowser from "../../utils/createBrowser";
import { Folder } from "../../types/Folder";

const defaultFileSystem: FileSystem = createFolder('root', "Root", [
    createFolder("desktop", "Desktop", [
        createFolder("folder1", "Test folder 1", [
            createFolder("folder2", "Nested folder 2", [
                createFolder("folder3", "Nested folder 3", [
                    createFolder("folder4", "Nested folder 4", [])
                ]),
                createFile("nestedfile2", "Nested file 2")
            ]),
            createFile("nestedfile1", "Nested file 1")
        ]),
        createFile("browser", "Browser", "browser", "https://cdn-icons-png.freepik.com/512/4387/4387430.png"),
        createBrowser('browser', 'aspdevs', '', 'https://aspdevs.vercel.app'),
        createBrowser('browser', 'syncspace', '', 'https://syncspace-cyan.vercel.app/'),
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
