import { useState } from 'react';
import styles from './ImageFile.module.scss';
import { ImageFile as ImageFileType } from "../../types/ImageFile";
import { CiZoomIn, CiZoomOut } from 'react-icons/ci';

export default function ImageFile({ file }: { file: ImageFileType }) {
    const [scale, setScale] = useState(1);

    const handleZoomIn = () => {
        setScale(prevScale => Math.min(3, prevScale + 0.2));
    };

    const handleZoomOut = () => {
        setScale(prevScale => Math.max(0.2, prevScale - 0.2));
    };

    return (
        <div className={styles.imageFileContainer}>
            <div className={styles.imageContainer}>
                <img
                    src={file.src}
                    alt={file.name}
                    style={{ transform: `scale(${scale})` }}
                    className={styles.zoomableImage}
                />
            </div>
            <div className={styles.controls}>
                <button onClick={handleZoomOut} aria-label='Zoom out'><CiZoomOut /></button>
                <button onClick={handleZoomIn} aria-label='Zoom in'><CiZoomIn /></button>
            </div>
        </div>
    );
}
