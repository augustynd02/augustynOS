import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './Notepad.module.scss';
import { TextFile } from '../../types/TextFile';
import FileSystemContext from '../../contexts/FileSystem/FileSystemContext';
import AppContext from '../../contexts/App/AppContext';

function Notepad({ file }: { file: TextFile }) {
    const [content, setContent] = useState<string>(file.content);
    const [hasChanged, setHasChanged] = useState<boolean>(file.content !== content);
    const [fileMenuOpen, setFileMenuOpen] = useState<boolean>(false);
    const { updateFileById } = useContext(FileSystemContext);
    const { editAppName, closeApp } = useContext(AppContext);
    const fileMenuRef = useRef<HTMLDivElement>(null);

    // TODO: prompt user about saving the file if window is being closed

    useEffect(() => {
        setHasChanged(file.content !== content);
    }, [content, file.content]);

    useEffect(() => {
        if (hasChanged) {
            if (!file.name.startsWith('*')) {
                editAppName(file.id, `* ${file.name}`);
            }
        } else {
            if (file.name.startsWith('* ')) {
                editAppName(file.id, file.name.substring(2));
            }
        }
    }, [hasChanged, file.id, file.name, editAppName]);

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
                                closeApp(file.id)
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
                <span>{content.length} characters</span>
            </div>
        </div>
    )
}

export default Notepad;
