import React, { useState } from 'react';

import styles from './Notepad.module.scss';

function Notepad({ initialContent }: { initialContent: string }) {
    const [content, setContent] = useState(initialContent);
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    return (
        <div className={styles.notepadContainer}>
            <div className={styles.actions}>
                <span>File</span>
                <span>Format</span>
            </div>
            <textarea
                name=""
                id=""
                value={content}
                onChange={handleTextareaChange}
            >

            </textarea>
            <div className={styles.info}>

            </div>
        </div>
    )
}

export default Notepad;
