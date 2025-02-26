import { createContext } from "react";
import { Folder } from "../../types/Folder";

type FileSystemContextType = {
    fileSystem: Folder;
    getFolder: (id: string) => Folder | undefined;
};

const defaultContext: FileSystemContextType = {
  fileSystem: {
    id: 'root',
    name: 'Root',
    type: 'folder',
    children: []
  },
  getFolder: () => { throw new Error("getFolder called outside of FileSystemContext.Provider"); }
}

const FileSystemContext = createContext<FileSystemContextType>(defaultContext);

export default FileSystemContext;
