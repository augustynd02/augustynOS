import styles from './FolderIcon.module.scss';
import { Folder as FolderType } from '../../types/Folder';

type Props = {
    file: FolderType;
    handleOpenFolder: (item: FolderType) => void;
};

function FolderIcon({ file, handleOpenFolder }: Props) {
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
