import { useContext, useState, useEffect } from 'react';
import AppContext from '../../contexts/App/AppContext';
import styles from './taskbar.module.scss'
import { TbPlant2 } from "react-icons/tb";
import { BsChatSquare } from "react-icons/bs";
import { Application } from '../../types/Application';
import ActionsContext from "../../contexts/Actions/ActionsContext";
import { IoIosMenu, IoIosPower } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

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
            <StartMenuButton />
            <div className={styles.tabs} data-testid="tabs">
                {openApps.map(app => {
                    return <Tab key={app.id} app={app} toggleMinimize={toggleMinimize} />
                })}
            </div>
            <Clock />
            <Notifications />
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

function StartMenuButton() {
    const [isMenuShown, setIsMenuShown] = useState(false);

    return (
        <div className={styles.startMenuContainer} data-testid="startmenu" id="startmenu" onClick={() => setIsMenuShown(!isMenuShown)}>
            <div className={`${styles.logo} ${isMenuShown ? styles.active : ''}`}>
                <TbPlant2 />
            </div>
            { isMenuShown && (
                <div className={styles.startMenu}>
                    <div className={styles.actions}>
                        <button>
                            <IoIosMenu />
                            <span>START</span>
                        </button>
                        <button>
                            <FaUserCircle />
                            <span>Dominik Augustyn</span>
                        </button>
                        <button onClick={() => window.location.reload()}>
                            <IoIosPower />
                            <span>Power</span>
                        </button>
                    </div>
                    <div className={styles.items}>

                    </div>
                </div>
            )}
        </div>
    )
}

function Clock() {
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            const hours = now.getHours();
            const minutes = now.getMinutes();
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            setTime(`${hours}:${formattedMinutes}`);

            const day = now.getDate();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();
            setDate(`${day}/${month}/${year}`);
        };

        updateDateTime();

        const interval = setInterval(updateDateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.clock} data-testid="clock">
            <div className={styles.time}>{time}</div>
            <div className={styles.date}>{date}</div>
        </div>
    );
}

function Notifications() {
    return (
        <div className={styles.notifications}>
            <BsChatSquare />
        </div>
    )
}

export default Taskbar;
