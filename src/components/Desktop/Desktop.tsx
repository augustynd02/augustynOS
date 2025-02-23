import styles from './desktop.module.scss'
import DesktopIcon from '../DesktopIcon/DesktopIcon'
import React, { useContext } from 'react';
import AppContext from '../../contexts/App/AppContext';
import Window from '../Window/Window';
import { Icon } from '../../types/Icon';
import ActionsContext from "../../contexts/Actions/ActionsContext";
import { Action } from "../../types/Action";

const actions: Action[] = [
    {
        name: "Refresh",
        cb: () => { console.log("refresh clicked") },
    },
    {
        name: "Test",
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
    {
        name: "Test2",
        cb: () => { console.log("refresh clicked") },
    },
    {
        name: "Test3",
        cb: () => { console.log("refresh clicked") },
    },
]

function Desktop({ icons }: { icons: Icon[] }) {
    const { openApps } = useContext(AppContext);
    const { handleOpenModal } = useContext(ActionsContext);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    return (
        <div className={styles.desktop} data-testid="desktop" onDragOver={handleDragOver} onContextMenu={(e) => handleOpenModal(e, actions)}>
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
        </div>
    )
}

export default Desktop
