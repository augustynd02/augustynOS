import styles from './taskbar.module.scss'
import { TbPlant2 } from "react-icons/tb";

function Taskbar() {
    return (
        <div data-testid="taskbar" id="taskbar" className={styles.taskbar}>
            <StartMenu />
            <div className="tabs" data-testid="tabs">

            </div>
        </div>
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
