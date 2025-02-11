import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import styles from './taskbar.module.scss'
import { TbPlant2 } from "react-icons/tb";
import { Application } from '../../types/Application';

function Taskbar() {
    const { openApps } = useContext(AppContext);

    return (
        <div data-testid="taskbar" id="taskbar" className={styles.taskbar}>
            <StartMenu />
            <div className={styles.tabs} data-testid="tabs">
                { openApps.map(app => {
                    return <Tab app={app} />
                })}
            </div>
        </div>
    )
}

function Tab({ app }: { app: Application }) {
    return (
        <button key={app.id} className={styles.tab}>
            <figure>
                <picture>
                    <img src={app.iconURL} />
                </picture>
                <figcaption>
                    {app.name}
                </figcaption>
            </figure>
        </button>
    )
}

function StartMenu() {
    return (
        <div className={styles.startMenu} data-testid="startmenu" id="startmenu">
            <div className={styles.logo}>
                <TbPlant2 />
            </div>
        </div>
    )
}

export default Taskbar
