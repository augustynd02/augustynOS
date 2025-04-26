import React, { useState, useRef } from 'react';
import { tlds } from '../../constants/tlds';
import styles from './Browser.module.scss';

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineRefresh } from "react-icons/md";
import { TbPlant2 } from "react-icons/tb";
import { IoGitNetworkOutline } from 'react-icons/io5';

function Browser({ initialUrl = 'https://www.google.com/webhp?igu=1' }: { initialUrl: string }) {
    const [searchInputData, setSearchInputData] = useState(initialUrl);
    const [isInputClicked, setIsInputClicked] = useState(false);
    const [url, setUrl] = useState(initialUrl);
    const [iframeKey, setIframeKey] = useState(0);

    const [history, setHistory] = useState<string[]>([url]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputData(e.target.value);
    }

    const handleUpdateUrl = async (e: React.KeyboardEvent) => {
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
                setSearchInputData(newUrl);
                setUrl(newUrl);
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

    const handleBookmarkClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const bookmarkUrl = target.getAttribute('data-url');

        if (bookmarkUrl) {
            setUrl(bookmarkUrl);
            setSearchInputData(bookmarkUrl);
            setHistory(prev => [...prev, bookmarkUrl]);
            setHistoryIndex(prev => prev + 1);
        }

    }

    const handleBack = () => {
        setUrl(history[historyIndex - 1]);
        setHistoryIndex(prev => prev - 1);
    }

    const handleForward = () => {
        setUrl(history[historyIndex + 1]);
        setHistoryIndex(prev => prev + 1);
    }

    const handleRefresh = () => {
        setIframeKey(prev => prev + 1);
    };

    return (
        <div className={styles.browserContainer}>
            <div className={styles.actionBar}>
                <button onClick={handleBack} disabled={historyIndex === 0}>
                    <FaArrowLeft />
                </button>
                <button onClick={handleForward} disabled={history[historyIndex + 1] === undefined}>
                    <FaArrowRight />
                </button>
                <button onClick={handleRefresh}>
                    <MdOutlineRefresh />
                </button>
                <input
                    type="text"
                    value={searchInputData}
                    onChange={handleInputChange}
                    ref={searchInputRef}
                    onKeyDown={handleUpdateUrl}
                    onClick={handleInputClick}
                    onBlur={handleBlur}
                />
            </div>
            <div className={styles.bookmarksBar}>
                <button className={styles.bookmark} onClick={handleBookmarkClick} data-url="https://syncspace-cyan.vercel.app/">
                    <IoGitNetworkOutline style={{ color: '#660066' }}/>
                    <span>syncspace</span>
                </button>
                <button className={styles.bookmark} onClick={handleBookmarkClick} data-url="https://aspdevs.vercel.app">
                    <TbPlant2 />
                    <span>aspdevs</span>
                </button>
                <button className={styles.bookmark} onClick={handleBookmarkClick} data-url="https://sk-beryl.vercel.app">
                    <TbPlant2 />
                    <span>SK</span>
                </button>
            </div>
            <div className={styles.content}>
                <iframe key={iframeKey} src={url} ref={iframeRef}></iframe>
            </div>
        </div>
    )
}

export default Browser;
