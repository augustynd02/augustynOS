import styles from './window.module.scss';
import { Application } from '../../types/Application';
import React, { useEffect, useState, useCallback } from 'react';

import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";

type Position = {
    x: number;
    y: number;
}

function Window({ id, name, type }: Application) {
    const [dimensions, setDimensions] = useState({ width: 700, height: 700})
    const [initialPosition, setInitialPosition] = useState<Position>({x: 0, y: 0})
    const [position, setPosition] = useState<Position>({x: 0, y: 0})
    const [isDragging, setIsDragging] = useState(false);

    // Calculates how to position the window based on where the cursor is placed during the start of dragging
    const handleDragStart = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) return;
        setIsDragging(true);
        setInitialPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    }

    const handleDrag = useCallback((e: MouseEvent) => {
        e.preventDefault();
        setPosition({
            x: e.clientX - initialPosition.x,
            y: e.clientY - initialPosition.y
        });
    }, [initialPosition]);

    const handleDragEnd = () => {
        setIsDragging(false);
    }

    const handleClose = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, [])

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
        <div id={id} className={styles.window} style={{width: `${dimensions.width}px`, height: `${dimensions.height}px`, transform: `translate(${position.x}px, ${position.y}px)`}}>
            <div className={styles.bar} onMouseDown={handleDragStart} onMouseUp={handleDragEnd}>
                <p>{name}</p>
                <div className={styles.actions}>
                    <button> <VscChromeMinimize /> </button>
                    <button> <VscChromeMaximize /> </button>
                    <button onClick={handleClose}> <VscChromeClose /> </button>
                </div>
            </div>
            <div className={styles.content}>

            </div>
        </div>
    )
}

export default Window;
