import styles from './desktop.module.scss'
import DesktopIcon from '../DesktopIcon/DesktopIcon'

function Desktop() {
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    return (
        <div className={styles.desktop} data-testid="desktop" onDragOver={handleDragOver}>
            <DesktopIcon name="Test" />
            <DesktopIcon iconURL="https://cdn.iconscout.com/icon/free/png-256/free-email-icon-download-in-svg-png-gif-file-formats--envenlope-letter-mail-user-interface-pack-icons-83578.png" name="Very long iconname is it gdassssssssssssssssonna breddddddddddddddddddddddddddddddddddddak" />
            <DesktopIcon name="Very long iconname is it gonna break" />
        </div>
    )
}

export default Desktop
