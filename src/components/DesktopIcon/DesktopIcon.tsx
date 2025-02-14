import React, { useContext } from 'react';
import styles from './desktopicon.module.scss';
import AppContext from '../../contexts/AppContext';
import { Icon } from '../../types/Icon';
import createApp from '../../utils/createApp';

function DesktopIcon({ icon }: { icon: Icon }) {
    const { startApp } = useContext(AppContext);
    const handleDoubleClick = () => {
        // TODO: maybe link the IDs of icon and corresponding app
        const app = createApp(icon.name, icon.type, icon.iconURL);
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
