import React, { useState } from "react";
import FileSystemContext from "./FileSystemContext";
import { FileSystem } from "../../types/FileSystem";
import isFolder from "../../utils/isFolder";

import { Folder } from "../../types/Folder";
import defaultFileSystem from "../../constants/defaultFileSystem";


export default function FileSystemProvider({ children }: { children: React.ReactNode }) {
    const [fileSystem, setFileSystem] = useState<FileSystem>(defaultFileSystem);

    const getFolder = (id: string): Folder | undefined => {
        const item = fileSystem.children.find((item) => item.id === id);
        return item && isFolder(item) ? item : undefined;
    };

    const updateFileById = (id: string, updateFn: (file: any) => any) => {
        const fsCopy = structuredClone(fileSystem);

        const updateFile = (children: any[]): boolean => {
            for (let i = 0; i < children.length; i++) {
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
        <FileSystemContext.Provider value={{ fileSystem, setFileSystem, getFolder, updateFileById }}>
            {children}
        </FileSystemContext.Provider>
    )
}
