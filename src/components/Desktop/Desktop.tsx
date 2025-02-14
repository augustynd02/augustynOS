import styles from './desktop.module.scss'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import React, { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import Window from '../Window/Window';
import { Application } from '../../types/Application';

function Desktop({ icons }: { icons: Application[] }) {
    const { openApps } = useContext(AppContext);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    return (
        <div className={styles.desktop} data-testid="desktop" onDragOver={handleDragOver}>
            {
                icons.map(app => {
                    return <DesktopIcon name={app.name} type={app.type} />
                })
            }
            {
                openApps.map(app => {
                    return <Window key={app.id} id={app.id} name={app.name} type={app.type} iconURL={app.iconURL} />
                })
            }
        </div>
    )
}

export default Desktop
