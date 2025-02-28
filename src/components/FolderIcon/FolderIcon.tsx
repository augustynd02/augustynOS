import styles from './FolderIcon.module.scss';
import { File } from '../../types/File';
import { Folder as FolderType } from '../../types/Folder';

function FolderIcon({ file, handleOpenFolder }: { file: FolderType, handleOpenFolder: (item: FolderType) => void }) {
    return (
        <li className={styles.desktopIcon} draggable="true" data-testid="foldericon" onDoubleClick={() => { handleOpenFolder(file) }}>
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
