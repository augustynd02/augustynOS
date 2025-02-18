import styles from './desktop.module.scss'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import React, { useState, useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import Window from '../Window/Window';
import { Icon } from '../../types/Icon';
import ActionsModal from '../ActionsModal/ActionsModal';
import useActionsModal from '../../hooks/useActionsModal';

type Action = {
    name: string;
    cb: () => void;
    options?: Action[];
}

function Desktop({ icons }: { icons: Icon[] }) {
    const [isRightClicked, setIsRightClicked] = useState(false);
    const { openApps } = useContext(AppContext);
    const { handleOpenModal, handleCloseModal, modalPosition, isModalShown } = useActionsModal()

    const actions: Action[] = [
        {
            name: "Refresh",
            cb: () => { console.log("refresh clicked") },
        },
        {
            name: "Sort by",
            cb: () => { console.log("sortby clicked") },
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
        }
    ]

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    return (
        <div className={styles.desktop} data-testid="desktop" onDragOver={handleDragOver} onContextMenu={handleOpenModal} onClick={handleCloseModal}>
            {
                icons.map(icon => {
                    return <DesktopIcon key={icon.id} icon={icon} />
                })
            }
            {
                openApps.map(app => {
                    return <Window key={app.id} app={app} />
                })
            }
            {
                isModalShown ? <ActionsModal actions={actions} position={modalPosition} /> : null
            }
        </div>
    )
}

export default Desktop
