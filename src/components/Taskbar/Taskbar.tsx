import styles from './taskbar.module.scss'

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
        <div data-testid="startmenu" id="startmenu">
            <div className="icon"></div>
        </div>
    )
}

export default Taskbar
