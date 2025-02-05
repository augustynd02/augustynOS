import styles from './window.module.scss';

interface WindowProps {
    name: string
}

function Window({ name }: WindowProps) {
    return (
        <div className={styles.window}>
            <div className={styles.bar}>
                {name}
            </div>
            <div className={styles.content}>

            </div>
        </div>
    )
}

export default Window;
