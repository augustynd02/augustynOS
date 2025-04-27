import React, { useState } from "react";
import FileSystemContext from "./FileSystemContext";
import { FileSystem } from "../../types/FileSystem";

import createFolder from "../../utils/createFolder";
import createFile from "../../utils/createFile";
import createTextFile from "../../utils/createTextFile";
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
        createTextFile('readme', 'README.txt', 'Welcome to my OS Portfolio!\n\nThis is a Windows 10-inspired interface built with React and TypeScript.\n\nFeel free to explore the various applications and functionality.'),
        createTextFile('todo', 'TODO.txt', '[ ] Complete browser implementation\n[ ] Add more desktop icons\n[ ] Implement start menu\n[x] Create file system\n[ ] Add context menus'),
        createFile("file1", "Test file 1"),
        createFile("file2", "Test file 2"),
    ]),
])

export default function FileSystemProvider({ children } : { children: React.ReactNode}) {
    const [fileSystem, setFileSystem] = useState<FileSystem>(defaultFileSystem);

    const getFolder = (id: string): Folder | undefined => {
        return fileSystem.children.find((item) => item.id === id) as Folder;
    };
    const updateFileById = (id: string, updateFn: (file: any) => any) => {
        const fsCopy = structuredClone(fileSystem);

        const updateFile = (children: any[]): boolean => {
            for(let i = 0; i < children.length; i++) {
                const item = children[i];
                if (item.id === id) {
                    children[i] = updateFn(item);
                    return true;
                }

                if (item.children && item.children.length > 0) {
                    if (updateFile(item.children)) {
                        return true;
                    }
                }
            }
            return false;
        };

        updateFile(fsCopy.children);
        setFileSystem(fsCopy);
    };

    return (
        <FileSystemContext.Provider value={{fileSystem, setFileSystem, getFolder, updateFileById}}>
            { children }
        </FileSystemContext.Provider>
    )
}
