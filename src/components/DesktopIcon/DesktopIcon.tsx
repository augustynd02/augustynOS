import React from 'react';
import styles from './desktopicon.module.scss';
import { E } from 'vitest/dist/chunks/reporters.0x019-V2.js';

interface DesktopIconProps {
    iconURL?: string;
    name: string;
}

function DesktopIcon({
    iconURL = "https://static.wixstatic.com/media/4da7cd_dc99fe81c55f42ccb196238660d25e73~mv2.jpg/v1/fill/w_256,h_256,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/placeholder.jpg",
    name
}: DesktopIconProps) {
    const handleDragEnd = (e: React.DragEvent) => {
        // Desktop grid dimensions: 80x80
        const target = e.target as HTMLLIElement;

        const gridColumn = Math.ceil((e.clientX - 1 * (e.clientX / 80)) / 80);
        const gridRow = Math.ceil((e.clientY - (16 * Math.floor(e.clientY / 80))) / 80);

        target.style.gridColumnStart = gridColumn.toString();
        target.style.gridRowStart = gridRow.toString();
    }
    return (
        <li className={styles.desktopIcon} draggable="true" onDragEnd={handleDragEnd} data-testid="desktopicon">
            <button role="button">
                <figure>
                    <img src={iconURL} alt={`${name} icon`} className={styles.icon} draggable="false" />
                    <figcaption className={styles.name}>
                        {name}
                    </figcaption>
                </figure>
            </button>
        </li>
    )
}

export default DesktopIcon;
