import styles from './window.module.scss';
import { Application } from '../../types/Application';
import React, { useState, useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import useWindowDrag from '../../hooks/useWindowDrag';
import useWindowResize from '../../hooks/useWindowResize';

import {
    VscChromeMinimize,
    VscChromeMaximize,
    VscChromeRestore,
    VscChromeClose
} from "react-icons/vsc";

type Position = {
    x: number;
    y: number;
};

function Window({ app }: { app: Application }) {
    const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = useState(false);

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
            className={`${styles.window} ${isMaximized ? styles.maximized : ""} ${app.isMinimized ? styles.minimized : ""}`}
            style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
                transform: `translate(${position.x}px, ${position.y}px)`
            }}
        >
            <div className={styles.bar} onMouseDown={handleDragStart} onMouseUp={handleDragEnd}>
                <figure>
                    <img src={app.iconURL} alt="" />
                    <figcaption>
                        {app.name}
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
            <div className={styles.content}></div>

            <div className={`${styles.resizer} ${styles.resizer__up}`} onMouseDown={handleResizeStart} data-direction="up"></div>
            <div className={`${styles.resizer} ${styles.resizer__right}`} onMouseDown={handleResizeStart} data-direction="right"></div>
            <div className={`${styles.resizer} ${styles.resizer__down}`} onMouseDown={handleResizeStart} data-direction="down"></div>
            <div className={`${styles.resizer} ${styles.resizer__left}`} onMouseDown={handleResizeStart} data-direction="left"></div>

            <div className={`${styles.resizer} ${styles.resizer__ne}`} onMouseDown={handleResizeStart} data-direction="ne"></div>
            <div className={`${styles.resizer} ${styles.resizer__se}`} onMouseDown={handleResizeStart} data-direction="se"></div>
            <div className={`${styles.resizer} ${styles.resizer__sw}`} onMouseDown={handleResizeStart} data-direction="sw"></div>
            <div className={`${styles.resizer} ${styles.resizer__nw}`} onMouseDown={handleResizeStart} data-direction="nw"></div>
        </div>
    );
}

export default Window;
