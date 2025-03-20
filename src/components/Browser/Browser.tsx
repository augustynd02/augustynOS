import styles from './Browser.module.scss';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineRefresh } from "react-icons/md";

import React, { useState, useRef, useEffect } from 'react';

import { tlds } from '../../constants/tlds';

function Browser() {
    const [searchInputData, setSearchInputData] = useState('https://www.google.com/webhp?igu=1');
    const [isInputClicked, setIsInputClicked] = useState(false);
    const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');

    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputData(e.target.value);
    }

    const handleUpdateUrl = async (e) => {
        if (document.activeElement === searchInputRef.current) {
            if (e.key === 'Enter') {
                let isDirectLink = false;
                let newUrl = searchInputData;

                const domainParts = searchInputData.split('.');
                const lastDomainPart = domainParts[domainParts.length - 1].toLowerCase();
                isDirectLink = tlds.has(lastDomainPart);

                newUrl = isDirectLink ? `https://${searchInputData}` : `https://www.google.com/search?igu=1&q=${searchInputData}`;

                setUrl(newUrl);
                setSearchInputData(newUrl);
            }
        }
    }

    const handleInputClick = () => {
        if (!isInputClicked) {
            searchInputRef.current?.select();
            setIsInputClicked(true);
        }
    }

    const handleBlur = () => {
        setIsInputClicked(false);
    }

    const handleBack = () => {

    }

    const handleRefresh = () => {

    };

    return (
        <div className={styles.browserContainer}>
            <div className={styles.actionBar}>
                <button onClick={handleBack}>
                    <FaArrowLeft />
                </button>
                <button>
                    <FaArrowRight />
                </button>
                <button onClick={handleRefresh}>
                    <MdOutlineRefresh />
                </button>
                <input type="text" value={searchInputData} onChange={handleInputChange} ref={searchInputRef} onKeyDown={handleUpdateUrl} onClick={handleInputClick} onBlur={handleBlur}/>
            </div>
            <div className={styles.content}>
                <iframe src={url} ></iframe>
            </div>
        </div>
    )
}

export default Browser;
