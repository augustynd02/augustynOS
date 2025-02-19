import styles from './ActionsModal.module.scss';
import { useState } from 'react';

type Action = {
    name: string;
    cb: () => void;
    iconURL?: string;
    options?: Action[];
}

type Position = {
    x: number;
    y: number;
};


function ActionsModal({ actions, position, isSubModal = false }: { actions: Action[], position?: Position, isSubModal: boolean }) {
    return (
        <div
            className={`${styles.actionsModal} ${isSubModal ? styles.subActionsModal : ''}`}
            style={position ? { transform: `translate(${position.x}px, ${position.y}px)` } : undefined}
        >
            {actions.map(action => (
                <ActionItem key={action.name} action={action} />
            ))}
        </div>
    );
}

function ActionItem({ action }: { action: Action }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={styles.action} onMouseLeave={() => { setIsExpanded(false) }}>
            <div className={styles.iconContainer}></div>
            <button onClick={action.cb} onMouseOver={() => { setIsExpanded(true)}}> {action.name} </button>
            {isExpanded && action.options ? <ActionsModal actions={action.options} isSubModal={true} /> : null}
        </div>
    )
}

export default ActionsModal;
