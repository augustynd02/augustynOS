import styles from './ActionsModal.module.scss';
import { useState, useRef, useEffect } from 'react';

import { FaChevronRight } from "react-icons/fa6";

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


function ActionsModal({ actions, position, isSubModal = false }: { actions: Action[], position?: Position, isSubModal?: boolean }) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalHeight, setModalHeight] = useState(0);

    useEffect(() => {
        if (modalRef.current) {
            setModalHeight(modalRef.current.offsetHeight);
        }
    }, [actions]);

    const isLowerHalf = position && position.y > window.innerHeight / 2;
    const adjustedY = isLowerHalf ? position.y - modalHeight : position.y;

    return (
        <div
            ref={modalRef}
            className={`${styles.actionsModal} ${isSubModal ? styles.subActionsModal : ''}`}
            style={position ? { transform: `translate(${position.x}px, ${adjustedY}px)` } : undefined}
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
            <button onClick={action.cb} onMouseOver={() => { setIsExpanded(true)}}> {action.name} { action.options && <FaChevronRight />}</button>
            {isExpanded && action.options ? <ActionsModal actions={action.options} isSubModal={true} /> : null}
        </div>
    )
}

export default ActionsModal;
