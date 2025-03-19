import styles from './Browser.module.scss';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineRefresh } from "react-icons/md";

import { useState } from 'react';

function Browser() {
    const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
    return (
        <div className={styles.browserContainer}>
            <div className={styles.actionBar}>
                <button>
                    <FaArrowLeft />
                </button>
                <button>
                    <FaArrowRight />
                </button>
                <button>
                    <MdOutlineRefresh />
                </button>
                <input type="text" />
            </div>
            <div className={styles.content}>
                <iframe src={url}></iframe>
            </div>
        </div>
    )
}

export default Browser;
