import styles from './window.module.scss';
import { Application } from '../../types/Application';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import AppContext from '../../contexts/AppContext';

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

function Window({ id, name, type, iconURL }: Application) {
    const [dimensions, setDimensions] = useState({ width: 700, height: 700 });
    const [initialPosition, setInitialPosition] = useState<Position>({ x: 0, y: 0 });
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);

    const { closeApp } = useContext(AppContext);

    const handleDragStart = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) return;
        setIsDragging(true);
        setInitialPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleDrag = useCallback(
        (e: MouseEvent) => {
            // TODO: snap the window to the middle of the cursor when restoring a maximized window during a drag
            if (isMaximized) setIsMaximized(false);
            e.preventDefault();
            setPosition({
                x: e.clientX - initialPosition.x,
                y: e.clientY - initialPosition.y
            });
        },
        [initialPosition, isMaximized]
    );

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
        setPosition({
            x: 0,
            y: 0
        })
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeApp(id);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', handleDragEnd);
        } else {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragEnd);
        };
    }, [isDragging, handleDrag]);

    return (
        <div
            id={id}
            data-testid="window"
            className={`${styles.window} ${isMaximized ? styles.maximized : ""}`}
            style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
                transform: `translate(${position.x}px, ${position.y}px)`
            }}
        >
            <div className={styles.bar} onMouseDown={handleDragStart} onMouseUp={handleDragEnd}>
                <p>{name}</p>
                <div className={styles.actions}>
                    <button>
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
        </div>
    );
}

export default Window;
