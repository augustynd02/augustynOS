import styles from './window.module.scss';
import { Application } from '../../types/Application';
import React, { useState } from 'react';

import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";

type Position = {
    x: number;
    y: number;
}

function Window({ id, name, type }: Application) {
    const [dimensions, setDimensions] = useState({ width: 700, height: 700});
    const [initialPosition, setInitialPosition] = useState<Position>({x: 0, y: 0})
    const [position, setPosition] = useState<Position>({x: 0, y: 0})

    const handleDragStart = (e: React.MouseEvent) => {
        setInitialPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    }

    const handleDrag = (e: React.MouseEvent) => {
        e.preventDefault();
        setPosition({x: e.clientX - initialPosition.x, y: e.clientY - initialPosition.y});
    }

    return (
        <div id={id} className={styles.window} style={{width: `${dimensions.width}px`, height: `${dimensions.height}px`, transform: `translate(${position.x}px, ${position.y}px)`}}>
            <div className={styles.bar} draggable={true}onDragStart={handleDragStart} onDrag={handleDrag} >
                <p>{name}</p>
                <div className={styles.actions}>
                    <button> <VscChromeMinimize /> </button>
                    <button> <VscChromeMaximize /> </button>
                    <button> <VscChromeClose /> </button>
                </div>
            </div>
            <div className={styles.content}>

            </div>
        </div>
    )
}

export default Window;
