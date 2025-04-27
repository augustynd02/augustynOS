import { createContext } from "react";
import { Folder } from "../../types/Folder";

type FileSystemContextType = {
    fileSystem: Folder;
    setFileSystem: React.Dispatch<React.SetStateAction<Folder>>;
    getFolder: (id: string) => Folder | undefined;
    updateFileById: (id: string, updateFn: (file: any) => any) => void;
};

const defaultContext: FileSystemContextType = {
  fileSystem: {
    id: 'root',
    name: 'Root',
    type: 'folder',
    children: []
  },
  setFileSystem: () => { throw new Error("setFileSystem called outside of FileSystemContext.Provider"); },
  getFolder: () => { throw new Error("getFolder called outside of FileSystemContext.Provider"); },
  updateFileById: () => { throw new Error("updateFileById called outside of FileSystemContext.Provider"); }
}

const FileSystemContext = createContext<FileSystemContextType>(defaultContext);

export default FileSystemContext;
