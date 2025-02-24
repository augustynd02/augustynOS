import styles from './Folder.module.scss';

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { BiSolidChevronDown } from "react-icons/bi";

function Folder() {
    return (
        <div className={styles.folderContainer}>
            <div className={styles.actionBar}>
                <button> <FaArrowLeft /> </button>
                <button> <FaArrowRight /> </button>
                <button> <BiSolidChevronDown /> </button>
                <button> <FaArrowUp /> </button>
                <div className="location">
                    <img src="" alt="" />
                    <input type="text" />
                </div>
                <div className="search">
                    <input type="text" name="" id="" />
                    <img src="" alt="" />
                </div>
            </div>
            <div className={styles.content}>a</div>
            <div className={styles.info}></div>
        </div>
    )
}

export default Folder;
