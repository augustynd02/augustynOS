import styles from './FolderIcon.module.scss';
import { File } from '../../types/File';

function FolderIcon({ file }: { file: File }) {
    return (
        <li className={styles.desktopIcon} draggable="true" data-testid="foldericon">
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
