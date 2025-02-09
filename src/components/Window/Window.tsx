import styles from './window.module.scss';
import { Application } from '../../types/Application';
import React, { useState } from 'react';

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
        setIsDragging(true);
        setInitialPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    }

    const handleDrag = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isDragging) {
            setPosition({x: e.clientX - initialPosition.x, y: e.clientY - initialPosition.y});
        }
    }

    const handleDragEnd = () => {
        setIsDragging(false);
    }

    const handleClose = (e: React.MouseEvent) => {
        console.log()
        e.stopPropagation();
    }

    return (
        <div id={id} className={styles.window} style={{width: `${dimensions.width}px`, height: `${dimensions.height}px`, transform: `translate(${position.x}px, ${position.y}px)`}}>
            <div className={styles.bar} onMouseDown={handleDragStart} onMouseMove={handleDrag} onMouseUp={handleDragEnd} >
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
