import styles from './FolderIcon.module.scss';
import { File } from '../../types/File';

function FolderIcon({ file, handleOpen }: { file: File, handleOpen: () => void }) {
    return (
        <li className={styles.desktopIcon} draggable="true" data-testid="foldericon" onDoubleClick={handleOpen}>
            <button role="button">
                <figure>
                    <img src={file.iconURL} alt={`${file.name} icon`} className={styles.icon} draggable="false" />
                    <figcaption className={styles.name}>
                        {file.name}
                    </figcaption>
                </figure>
            </button>
        </li>
    )
}

export default FolderIcon;
