import { createContext } from "react";
import { Folder } from "../../types/Folder";

type FileSystemContextType = {
    fileSystem: Folder;
};

const defaultContext: FileSystemContextType = {
  fileSystem: {
    id: 'root',
    name: 'Root',
    type: 'folder',
    children: []
  }
}

const FileSystemContext = createContext<FileSystemContextType>(defaultContext);

export default FileSystemContext;
