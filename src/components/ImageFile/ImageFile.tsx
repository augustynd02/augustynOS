import styles from './ImageFile.module.scss'

import { ImageFile as ImageFileType } from "../../types/ImageFile";

export default function ImageFile({ file }: { file: ImageFileType}) {
    return (
        <div className={styles.imageContainer}>
            <img src={file.src} alt={file.name} />
        </div>
    )
}
