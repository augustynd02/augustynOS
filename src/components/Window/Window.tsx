import styles from './window.module.scss';
import { Application } from '../../types/Application';

function Window({ id, name, type }: Application) {
    return (
        <div id={id} className={styles.window}>
            <div className={styles.bar}>
                {name}
            </div>
            <div className={styles.content}>

            </div>
        </div>
    )
}

export default Window;
