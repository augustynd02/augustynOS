import styles from './ActionsModal.module.scss';
import { useState } from 'react';

type Action = {
    name: string;
    cb: () => void;
    options?: Action[];
}

type Position = {
    x: number;
    y: number;
};


function ActionsModal({ actions, position }: { actions: Action[], position: Position }) {
    return (
        <div className={styles.actionsModal} style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
            { actions.map(action => (
                <ActionItem key={action.name} action={action} />
            ))}
        </div>
    )
}

function ActionItem({ action } : { action: Action }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
            <button className={styles.action} onClick={action.cb} onMouseOver={() => { setIsExpanded(true)}}> {action.name} </button>
            {isExpanded && action.options ? <ActionsModal actions={action.options} /> : null}
        </>
    )
}

export default ActionsModal;
