import styles from './Folder.module.scss';

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { BiSolidChevronDown } from "react-icons/bi";
import { LiaSearchSolid } from "react-icons/lia";
import { Folder as FolderType } from '../../types/Folder';

import DesktopIcon from '../DesktopIcon/DesktopIcon';
import FolderIcon from '../FolderIcon/FolderIcon';
import { useState } from 'react';
import isFolder from '../../utils/isFolder';

function Folder({ file }: { file: FolderType}) {
    const [currentFolder, setCurrentFolder] = useState(file);
    const [history, setHistory] = useState<FolderType[]>([])

    const handleOpenFolder = (item: FolderType) => {
        setCurrentFolder(item);
        setHistory(prev => [...prev, item]);
    }

    return (
        <div className={styles.folderContainer}>
            <div className={styles.actionBar}>
                <button> <FaArrowLeft /> </button>
                <button> <FaArrowRight /> </button>
                <button> <BiSolidChevronDown /> </button>
                <button> <FaArrowUp /> </button>
                <div className={styles.location}>
                    <img src="https://winaero.com/blog/wp-content/uploads/2018/11/folder-icon-big-256.png" alt="" />
                    <input type="text" value={file.name} />
                </div>
                <div className={styles.search}>
                    <input type="text" name="" id="" placeholder="Search..." />
                    <LiaSearchSolid />
                </div>
            </div>
            <div className={styles.content}>
                { currentFolder.children.map(item => {
                    if (isFolder(item)) {
                        return <FolderIcon file={item} handleOpenFolder={() => { handleOpenFolder(item) }}/>
                    }
                    return <DesktopIcon file={item} />
                })}
            </div>
            <div className={styles.info}>a</div>
        </div>
    )
}

export default Folder;
