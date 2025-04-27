import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './Notepad.module.scss';
import { TextFile } from '../../types/TextFile';
import FileSystemContext from '../../contexts/FileSystem/FileSystemContext';

function Notepad({file }: { file: TextFile }) {
    const [content, setContent] = useState<string>(file.content);
    const [hasChanged, setHasChanged] = useState<boolean>(file.content !== content);
    const [fileMenuOpen, setFileMenuOpen] = useState<boolean>(false);
    const { updateFileById } = useContext(FileSystemContext);
    const fileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHasChanged(file.content !== content);
    }, [content, file.content]);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        updateFileById(file.id, (fileToUpdate) => {
            return { ...fileToUpdate, content: content }
        })
        setHasChanged(false);
        setFileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (fileMenuRef.current && !fileMenuRef.current.contains(event.target as Node)) {
                setFileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.notepadContainer}>
            <div className={styles.actions}>
                <div
                    className={styles.action}
                    onClick={() => setFileMenuOpen(true)}
                    ref={fileMenuRef}
                >
                    <span>File</span>
                    {fileMenuOpen && (
                        <div className={styles.dropdown}>
                            <div className={styles.dropdownItem} onClick={handleSave}>
                                Save
                                <p className={styles.shortcut}>Ctrl+S</p>
                            </div>
                            <div className={styles.dropdownItem} onClick={(e) => {
                                e.stopPropagation();
                                setFileMenuOpen(false);
                            }}>
                                Exit
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className={styles.action}
                >
                    <span>Edit</span>
                </div>
            </div>
            <textarea
                value={content}
                onChange={handleTextareaChange}
            />
            <div className={styles.info}>
                {hasChanged && <span className={styles.unsavedIndicator}>*</span>}
            </div>
        </div>
    )
}

export default Notepad;
