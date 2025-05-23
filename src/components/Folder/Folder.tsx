import { useState, useContext, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaArrowUp } from 'react-icons/fa6';
import { BiSolidChevronDown } from 'react-icons/bi';
import { LiaSearchSolid } from 'react-icons/lia';

import styles from './Folder.module.scss';
import { Folder as FolderType } from '../../types/Folder';
import AppContext from '../../contexts/App/AppContext';
import isFolder from '../../utils/isFolder';

import DesktopIcon from '../DesktopIcon/DesktopIcon';
import FolderIcon from '../FolderIcon/FolderIcon';

type Props = {
    file: FolderType;
    appId: string;
};

function Folder({ file, appId }: Props) {
    const [currentFolder, setCurrentFolder] = useState(file)
    const [history, setHistory] = useState<FolderType[]>([])
    const [forwardHistory, setForwardHistory] = useState<FolderType[]>([])
    const { editAppName } = useContext(AppContext);

    useEffect(() => {
        editAppName(appId, currentFolder.name);
    }, [currentFolder])

    const handleOpenFolder = (item: FolderType) => {
        setCurrentFolder(item);
        setHistory(prev => [...prev, currentFolder]);
    }

    const handleGoBack = () => {
        if (history.length === 0) return;
        setHistory(prev => prev.slice(0, prev.length - 1));
        setForwardHistory(prev => [...prev, currentFolder]);
        setCurrentFolder(history[history.length - 1]);
    }

    const handleGoForward = () => {
        if (forwardHistory.length === 0) return;
        setHistory(prev => [...prev, currentFolder]);
        setForwardHistory(prev => prev.slice(0, prev.length - 1));
        setCurrentFolder(forwardHistory[forwardHistory.length - 1]);
    }

    return (
        <div className={styles.folderContainer} data-testid="folder">
            <div className={styles.actionBar}>
                <button
                    onClick={handleGoBack}
                    disabled={history.length === 0}
                    title={history.length > 0 ? `Back to ${history[history.length - 1].name}` : undefined}
                    aria-label='Go back'
                >
                    <FaArrowLeft />
                </button>
                <button
                    onClick={handleGoForward}
                    disabled={forwardHistory.length === 0}
                    title={forwardHistory.length > 0 ? `Forward to ${forwardHistory[forwardHistory.length - 1].name}` : undefined}
                    aria-label='Go forward'
                >
                    <FaArrowRight />
                </button>
                <button disabled={true}> <BiSolidChevronDown /> </button>
                <button disabled={true}> <FaArrowUp /> </button>
                <div className={styles.location}>
                    <img src="https://winaero.com/blog/wp-content/uploads/2018/11/folder-icon-big-256.png" alt="" />
                    <input type="text" value={currentFolder.name} />
                </div>
                <div className={styles.search}>
                    <input type="text" name="" id="" placeholder="Search..." />
                    <LiaSearchSolid />
                </div>
            </div>
            <div className={styles.content}>
                {currentFolder.children.map(item => {
                    if (isFolder(item)) {
                        return <FolderIcon key={item.id} file={item} handleOpenFolder={() => { handleOpenFolder(item) }} />
                    }
                    return <DesktopIcon key={item.id} file={item} />
                })}
                {currentFolder.children.length === 0 && <p style={{width: "100%"}}>This folder is empty.</p>}
            </div>
            <div className={styles.info} data-testid="info">
                <p>{currentFolder.children.length} {currentFolder.children.length === 1 ? 'item' : 'items'} |</p>
            </div>
        </div>
    )
}

export default Folder;
