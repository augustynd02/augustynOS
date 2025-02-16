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

type Direction = "up" | "right" | "down" | "left" | "ne" | "se" | "sw" | "nw";

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
    };

    const handleMinimize = () => {
        toggleMinimize(app.id);
    }

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeApp(app.id);
    };

    const handleResizeStart = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const direction = target.getAttribute('data-direction');
        if (direction === "up" || direction === "right" || direction === "down" || direction === "left" || direction == "ne" || direction == "se" || direction == "sw" || direction == "nw") {
            setResizingDirection(direction);
            setIsResizing(true);
            setInitialPosition({ x: e.clientX, y: e.clientY });
        } else {
            setResizingDirection(null);
        }
    }

    const handleResize = useCallback((e: MouseEvent) => {
        if (!isResizing) return;

        const deltaX = e.clientX - initialPosition.x;
        const deltaY = e.clientY - initialPosition.y;

        let newWidth = dimensions.width;
        let newHeight = dimensions.height;
        let newX = position.x;
        let newY = position.y;

        let newInitialX = e.clientX;
        let newInitialY = e.clientY;

        const maxWidth = 200;
        const maxHeight = 25;

        switch (resizingDirection) {
            case "up":
                if (dimensions.height - deltaY >= maxHeight) {
                    newHeight -= deltaY;
                    newY = e.clientY;
                }
                if (dimensions.height <= maxHeight) {
                    newInitialY = position.y
                }
                break;
            case "right":
                newWidth = Math.max(maxWidth, dimensions.width + deltaX);
                break;
            case "down":
                if (dimensions.height + deltaY >= maxHeight) {
                    newHeight += deltaY;
                }
                break;
            case "left":
                if (dimensions.width - deltaX >= maxWidth) {
                    newWidth -= deltaX;
                }
                if (dimensions.width > maxWidth) {
                    newX = e.clientX;
                }
                if (dimensions.width <= maxWidth) {
                    newInitialX = position.x;
                }
                break;
            case "ne":
                newWidth += deltaX;
                newHeight -= deltaY;
                newY = e.clientY;
                break;
            case "se":
                newWidth = Math.max(maxWidth, dimensions.width + deltaX);
                newHeight += deltaY;
                break;
            case "sw":
                if (dimensions.width - deltaX >= maxWidth) {
                    newWidth -= deltaX;
                }
                if (dimensions.width > maxWidth) {
                    newX = e.clientX;
                }
                if (dimensions.width <= maxWidth) {
                    newInitialX = position.x;
                }
                newHeight += deltaY;
                break;
            case "nw":
                if (dimensions.width - deltaX >= maxWidth) {
                    newWidth -= deltaX;
                }
                if (dimensions.width > maxWidth) {
                    newX = e.clientX;
                }
                if (dimensions.width <= maxWidth) {
                    newInitialX = position.x;
                }
                newHeight -= deltaY;
                newY = e.clientY;
                break;
            default:
                return;
        }

        setDimensions({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
        setInitialPosition({ x: newInitialX, y: newInitialY});
    }, [dimensions, initialPosition, isResizing, resizingDirection, position]);

    const handleResizeEnd = useCallback(() => {
        setIsResizing(false);
    }, []);

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
