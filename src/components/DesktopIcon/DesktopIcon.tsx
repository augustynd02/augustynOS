import React, { useContext } from 'react';
import styles from './desktopicon.module.scss';
import AppContext from '../../contexts/App/AppContext';
import { File } from '../../types/File';
import createApp from '../../utils/createApp';

interface IconPosition {
    gridRow: number;
    gridColumn: number;
}

function DesktopIcon({
    file,
    index = 0,
    position,
    onSwapPositions
}: {
    file: File,
    index?: number,
    position?: IconPosition,
    onSwapPositions?: (draggedIndex: number, newPosition: IconPosition) => void
}) {
    const { startApp } = useContext(AppContext);

    const handleDoubleClick = () => {
        const app = createApp(file);
        startApp(app);
    }

    const handleDragEnd = (e: React.DragEvent) => {
        // Desktop grid dimensions: 80x80
        const gridSize = 80;
        const gapSize = 16;

        const gridColumn = Math.ceil((e.clientX - 1 * (e.clientX / gridSize)) / gridSize);
        const gridRow = Math.ceil((e.clientY - (gapSize * Math.floor(e.clientY / gridSize))) / gridSize);

        if (onSwapPositions) {
            onSwapPositions(index, { gridColumn, gridRow });
        } else {
            const target = e.target as HTMLLIElement;
            target.style.gridColumnStart = gridColumn.toString();
            target.style.gridRowStart = gridRow.toString();
        }
    }

    return (
        <li
            className={styles.desktopIcon}
            draggable="true"
            onDoubleClick={handleDoubleClick}
            onDragEnd={handleDragEnd}
            data-testid="desktopicon"
            style={{
                gridColumnStart: position ? position.gridColumn : (index === 0 ? 1 : undefined),
                gridRowStart: position ? position.gridRow : (index === 0 ? 1 : undefined)
            }}
        >
            <button role="button">
                <figure>
                    <img
                        src={file.iconURL}
                        alt={`${file.name} icon`}
                        className={styles.icon}
                        draggable="false"
                    />
                    <figcaption className={styles.name}>
                        {file.name}
                    </figcaption>
                </figure>
            </button>
        </li>
    )
}

export default DesktopIcon;
