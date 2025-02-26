import { useContext } from 'react';
import AppContext from '../../contexts/App/AppContext';
import styles from './taskbar.module.scss'
import { TbPlant2 } from "react-icons/tb";
import { Application } from '../../types/Application';
import ActionsContext from "../../contexts/Actions/ActionsContext";

type Action = {
    name: string;
    cb: () => void;
    iconURL?: string;
    options?: Action[];
}

function Taskbar() {
    const { openApps, toggleMinimize } = useContext(AppContext);
    const { handleOpenModal } = useContext(ActionsContext);

    const actions: Action[] = [
        {
            name: "Taskbar option",
            cb: () => { console.log("clicked") },
        },
        {
            name: "Taskbar option 2",
            cb: () => { console.log("clicked") },
        },
        {
            name: "Taskbar option 3",
            cb: () => { console.log("clicked") },
            iconURL: "",
            options: [
                {
                    name: "Taskbar option 4",
                    cb: () => { console.log("clicked") }
                },
                {
                    name: "Taskbar option 5",
                    cb: () => { console.log("clicked") }
                }
            ]
        },
    ]

    return (
        <div data-testid="taskbar" id="taskbar" className={styles.taskbar} onContextMenu={(e) => handleOpenModal(e, actions)}>
            <StartMenu />
            <div className={styles.tabs} data-testid="tabs">
                { openApps.map(app => {
                    return <Tab key={app.id} app={app} toggleMinimize={toggleMinimize} />
                })}
            </div>
        </div>
    )
}

function Tab({ app, toggleMinimize }: { app: Application, toggleMinimize: (id: string) => void }) {
    const handleClick = () => {
        toggleMinimize(app.id);
    }
    return (
        <button key={app.id} className={styles.tab} onClick={handleClick}>
            <figure>
                <picture>
                    <img src={app.file.iconURL} />
                </picture>
                <figcaption>
                    {app.file.name}
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
