import styles from './window.module.scss';
import { Application } from '../../types/Application';
import React, { useState, useContext } from 'react';
import AppContext from '../../contexts/App/AppContext';
import useWindowDrag from '../../hooks/useWindowDrag';
import useWindowResize from '../../hooks/useWindowResize';

import Folder from '../Folder/Folder';
import Browser from '../Browser/Browser';
import Notepad from '../Notepad/Notepad';

import {
    VscChromeMinimize,
    VscChromeMaximize,
    VscChromeRestore,
    VscChromeClose
} from "react-icons/vsc";
import isFolder from '../../utils/isFolder';
import isTextFile from '../../utils/isTextFile';
import isImageFile from '../../utils/isImageFile';
import isBrowserFile from '../../utils/isBrowserFile';
import ImageFile from '../ImageFile/ImageFile';

type Position = {
    x: number;
    y: number;
};

const directions = ["up", "right", "down", "left", "ne", "se", "sw", "nw"];

function Window({ app, theme = 'dark' }: { app: Application, theme?: 'light' | 'dark' | undefined }) {
    const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
    const [position, setPosition] = useState<Position>(
        window // If in browser, calculate the center: if not (for example in testing), set default to x: 0, y: 0
            ? { x: window.innerWidth / 2 - dimensions.width / 2, y: window.innerHeight / 2 - dimensions.height / 2 }
            : { x: 0, y: 0 }
    );
    const [isMaximized, setIsMaximized] = useState(app.file.type === 'browser');

    const { closeApp, toggleMinimize } = useContext(AppContext);

    const { handleDragStart, handleDragEnd } = useWindowDrag({
        position,
        setPosition,
        isMaximized,
        setIsMaximized
    });

    const { handleResizeStart } = useWindowResize({
        position,
        setPosition,
        dimensions,
        setDimensions
    })

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const handleMinimize = () => {
        toggleMinimize(app.id);
    }

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeApp(app.id);
    };

    return (
        <div
            id={app.id}
            data-testid="window"
            className={`${styles.window} ${styles[theme]} ${isMaximized ? styles.maximized : ""} ${app.isMinimized ? styles.minimized : ""}`}
            style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
                transform: `translate(${position.x}px, ${position.y}px)`
            }}
        >
            <div className={styles.bar} onMouseDown={handleDragStart} onMouseUp={handleDragEnd}>
                <figure>
                    <img src={app.file.iconURL} alt={`${app.file.name} icon`} />
                    <figcaption>
                        {app.file.name}
                    </figcaption>
                </figure>
                <div className={styles.actions}>
                    <button onClick={handleMinimize}>
                        <VscChromeMinimize />
                    </button>
                    <button onClick={handleMaximize}>
                        {isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
                    </button>
                    <button onClick={handleClose} className={styles.close} data-testid="close">
                        <VscChromeClose />
                    </button>
                </div>
            </div>
            <div className={styles.content}>
                { isFolder(app.file) ? <Folder file={app.file} appId={app.id} /> : null }
                { isBrowserFile(app.file) ? <Browser initialUrl={app.file.initialUrl} /> : null }
                { isTextFile(app.file) ? <Notepad file={app.file} /> : null}
                { isImageFile(app.file) ? <ImageFile file={app.file} /> : null}
            </div>

            {directions.map((dir) => (
                <div
                    key={dir}
                    className={`${styles.resizer} ${styles[`resizer__${dir}`]}`}
                    onMouseDown={handleResizeStart}
                    data-direction={dir}
                />
            ))}
        </div>
    );
}

export default Window;
