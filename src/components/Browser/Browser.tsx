import styles from './Browser.module.scss';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineRefresh } from "react-icons/md";
import { TbPlant2 } from "react-icons/tb";

import React, { useState, useRef } from 'react';

import { tlds } from '../../constants/tlds';

function Browser() {
    const [searchInputData, setSearchInputData] = useState('https://www.google.com/webhp?igu=1');
    const [isInputClicked, setIsInputClicked] = useState(false);
    const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
    const [iframeKey, setIframeKey] = useState(0);

    const [history, setHistory] = useState<string[]>([url]);
    const [historyIndex, setHistoryIndex] = useState(1);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

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

                setHistory(prev => [...prev, newUrl]);
                setHistoryIndex(prev => prev + 1);
                setUrl(newUrl);
                setSearchInputData(newUrl);
            }
        }
    }

    const handleBookmarkClick = (url: string) => {
        setUrl(url);
        setSearchInputData(url);
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
        setUrl(history[historyIndex - 2]);
        setHistoryIndex(prev => prev - 1);
    }

    const handleForward = () => {
        setUrl(history[historyIndex]);
        setHistoryIndex(prev => prev + 1);
    }

    const handleRefresh = () => {
        setIframeKey(prev => prev + 1);
    };

    return (
        <div className={styles.browserContainer}>
            <div className={styles.actionBar}>
                <button onClick={handleBack} disabled={historyIndex === 1}>
                    <FaArrowLeft />
                </button>
                <button onClick={handleForward} disabled={history[historyIndex] === undefined}>
                    <FaArrowRight />
                </button>
                <button onClick={handleRefresh}>
                    <MdOutlineRefresh />
                </button>
                <input type="text" value={searchInputData} onChange={handleInputChange} ref={searchInputRef} onKeyDown={handleUpdateUrl} onClick={handleInputClick} onBlur={handleBlur}/>
            </div>
            <div className={styles.bookmarksBar}>
                <div className={styles.bookmark} onClick={() => { handleBookmarkClick('https://aspdevs.vercel.app')}}>
                    <TbPlant2 />
                    <span>aspdevs</span>
                </div>
                <div className={styles.bookmark} onClick={() => { handleBookmarkClick('https://sk-beryl.vercel.app')}}>
                    <TbPlant2 />
                    <span>SK</span>
                </div>
                <div className={styles.bookmark}>
                    <TbPlant2 />
                    <span>aspdevs</span>
                </div>
            </div>
            <div className={styles.content}>
                <iframe key={iframeKey} src={url} ref={iframeRef}></iframe>
            </div>
        </div>
    )
}

export default Browser;
