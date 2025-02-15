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

type Direction = "up" | "right" | "down" | "left";

function Window({ app }: { app: Application }) {
    const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
    const [initialPosition, setInitialPosition] = useState<Position>({ x: 0, y: 0 });
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizingDirection, setResizingDirection] = useState<Direction | null>(null);

    const { closeApp, toggleMinimize } = useContext(AppContext);

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

    const handleMinimize = () => {
        toggleMinimize(app.id);
    }

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeApp(app.id);
    };

    const handleResizeStart = (e: React.MouseEvent) => {
        console.log("Starting resizing");
        const target = e.target as HTMLElement;
        const direction = target.getAttribute('data-direction');
        if (direction === "up" || direction === "right" || direction === "down" || direction === "left") {
            setResizingDirection(direction);
            setIsResizing(true);
            setInitialPosition({ x: e.clientX, y: e.clientY });
        } else {
            setResizingDirection(null);
        }
    }

    const handleResize = useCallback((e: MouseEvent) => {
        if (!isResizing) return;

        switch (resizingDirection) {
            case "up":
                setDimensions(prev => ({
                    width: prev.width,
                    height: prev.height - (e.clientY - initialPosition.y)
                }))
                setPosition(prev => ({
                    x: prev.x,
                    y: e.clientY
                }))
                break;
            case "right":
                setDimensions(prev => ({
                    width: prev.width + (e.clientX - initialPosition.x),
                    height: prev.height
                }));
                break;
            case "down":
                setDimensions(prev => ({
                    width: prev.width,
                    height: prev.height + (e.clientY - initialPosition.y)
                }))
                break;
            case "left":
                setDimensions(prev => ({
                    width: prev.width - (e.clientX - initialPosition.x),
                    height: prev.height
                }));
                setPosition(prev => ({
                    x: e.clientX,
                    y: prev.y
                }))
                break;
        }

        setInitialPosition({
            x: e.clientX,
            y: e.clientY
        })
    }, [initialPosition, isResizing, resizingDirection])

    const handleResizeEnd = useCallback(() => {
        console.log("Ending resizing", dimensions.width);
        setIsResizing(false);
    }, [dimensions]);

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

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleResize);
            document.addEventListener('mouseup', handleResizeEnd);
        } else {
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', handleResizeEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', handleResizeEnd);
        };
    }, [isResizing, handleResize, handleResizeEnd]);

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
                    <button>
                        <VscChromeMinimize onClick={handleMinimize} />
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
        </div>
    );
}

export default Window;
