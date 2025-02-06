import styles from './desktop.module.scss'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import { useContext } from 'react';
import OpenAppsContext from '../../contexts/AppContext';
import Window from '../Window/Window';

function Desktop() {
    const openApps = useContext(OpenAppsContext);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    return (
        <div className={styles.desktop} data-testid="desktop" onDragOver={handleDragOver}>
            <DesktopIcon name="Test" />
            <DesktopIcon iconURL="https://cdn.iconscout.com/icon/free/png-256/free-email-icon-download-in-svg-png-gif-file-formats--envenlope-letter-mail-user-interface-pack-icons-83578.png" name="Very long iconname is it gdassssssssssssssssonna breddddddddddddddddddddddddddddddddddddak" />
            <DesktopIcon name="Very long iconname is it gonna break" />
            {
                openApps.map(app => {
                    return <Window name={app.name} />
                })
            }
        </div>
    )
}

export default Desktop
