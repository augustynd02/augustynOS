import styles from './desktop.module.scss'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import React, { useContext, useState } from 'react';
import AppContext from '../../contexts/App/AppContext';
import Window from '../Window/Window';
import ActionsContext from "../../contexts/Actions/ActionsContext";
import { Action } from "../../types/Action";
import FileSystemContext from "../../contexts/FileSystem/FileSystemContext";

const actions: Action[] = [
    {
        name: "Refresh",
        cb: () => { console.log("refresh clicked") },
    },
    {
        name: "Sort by",
        cb: () => { console.log("sortby clicked") },
        iconURL: "",
        options: [
            {
                name: "Ascending",
                cb: () => { console.log("asc clicked") }
            },
            {
                name: "Descending",
                cb: () => { console.log("desc clicked") }
            }
        ]
    },
]

interface IconPosition {
    gridRow: number;
    gridColumn: number;
}

function Desktop() {
    const { openApps } = useContext(AppContext);
    const { handleOpenModal } = useContext(ActionsContext);
    const { getFolder } = useContext(FileSystemContext);
    const desktopFolder = getFolder('desktop');

    const desktopItems = desktopFolder?.children ?? [];

    const [iconPositions, setIconPositions] = useState<IconPosition[]>(
        desktopItems.map((_, index) => ({
            gridColumn: 1,
            gridRow: index + 1
        }))
    );

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    const handleSwapPositions = (draggedIndex: number, newPosition: IconPosition): void => {
        setIconPositions(prevPositions => {
            const newPositions = [...prevPositions];

            const targetIndex = newPositions.findIndex(
                pos => pos.gridColumn === newPosition.gridColumn && pos.gridRow === newPosition.gridRow
            );

            if (targetIndex !== -1 && targetIndex !== draggedIndex) {
                const draggedPosition = { ...newPositions[draggedIndex] };
                newPositions[draggedIndex] = { ...newPosition };
                newPositions[targetIndex] = { ...draggedPosition };
            } else {
                newPositions[draggedIndex] = { ...newPosition };
            }

            return newPositions;
        });
    };

    return (
        <div className={styles.desktop} data-testid="desktop" onDragOver={handleDragOver} onContextMenu={(e) => handleOpenModal(e, actions)}>
            {
                desktopItems.map((file, index) => {
                    return <DesktopIcon
                        key={file.id}
                        file={file}
                        index={index}
                        position={iconPositions[index]}
                        onSwapPositions={handleSwapPositions}
                    />
                })
            }
            {
                openApps.map(app => {
                    return <Window key={app.id} app={app} theme={app.file.theme}/>
                })
            }
        </div>
    )
}

export default Desktop
