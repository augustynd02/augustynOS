import styles from './desktop.module.scss'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import React, { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import Window from '../Window/Window';

function Desktop({ children }: { children?: React.ReactNode}) {
    const { openApps } = useContext(AppContext);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    return (
        <div className={styles.desktop} data-testid="desktop" onDragOver={handleDragOver}>
            <DesktopIcon name="Test" type="test" />
            <DesktopIcon iconURL="https://cdn.iconscout.com/icon/free/png-256/free-email-icon-download-in-svg-png-gif-file-formats--envenlope-letter-mail-user-interface-pack-icons-83578.png" name="Very long iconname is it gdassssssssssssssssonna breddddddddddddddddddddddddddddddddddddak" type="test"/>
            {
                openApps.map(app => {
                    return <Window key={app.id} id={app.id} name={app.name} type={app.type} />
                })
            }
            {children}
        </div>
    )
}

export default Desktop
