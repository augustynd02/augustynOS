import React, { useContext } from 'react';
import styles from './desktopicon.module.scss';
import AppContext from '../../contexts/AppContext';
import { Application } from '../../types/Application';
import { Icon } from '../../types/Icon';

function DesktopIcon({ icon }: { icon: Icon }) {
    const { startApp } = useContext(AppContext);
    const handleDoubleClick = () => {
        const app: Application = {
            id: icon.id,
            name: icon.name,
            type: icon.type,
            iconURL: icon.iconURL,
            isMinimized: false
        }
        startApp(app);
    }
    const handleDragEnd = (e: React.DragEvent) => {
        // Desktop grid dimensions: 80x80
        const target = e.target as HTMLLIElement;

        const gridSize = 80;
        const gapSize = 16;

        const gridColumn = Math.ceil((e.clientX - 1 * (e.clientX / gridSize)) / gridSize);
        const gridRow = Math.ceil((e.clientY - (gapSize * Math.floor(e.clientY / gridSize))) / gridSize);

        target.style.gridColumnStart = gridColumn.toString();
        target.style.gridRowStart = gridRow.toString();
    }
    return (
        <li className={styles.desktopIcon} draggable="true" onDoubleClick={handleDoubleClick} onDragEnd={handleDragEnd} data-testid="desktopicon">
            <button role="button">
                <figure>
                    <img src={icon.iconURL} alt={`${icon.name} icon`} className={styles.icon} draggable="false" />
                    <figcaption className={styles.name}>
                        {icon.name}
                    </figcaption>
                </figure>
            </button>
        </li>
    )
}

export default DesktopIcon;
