import styles from './Folder.module.scss';

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { BiSolidChevronDown } from "react-icons/bi";
import { LiaSearchSolid } from "react-icons/lia";
import { File } from '../../types/File';

import DesktopIcon from '../DesktopIcon/DesktopIcon';
import FolderIcon from '../FolderIcon/FolderIcon';

function Folder({ file }: { file: File}) {
    console.log(file);
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
                { file.children.map(item => {
                    if (item.type === "folder") {
                        return <FolderIcon file={item} />
                    }
                    return <DesktopIcon file={item} />
                })}
            </div>
            <div className={styles.info}>a</div>
        </div>
    )
}

export default Folder;
