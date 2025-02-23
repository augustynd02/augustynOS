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

type Dimensions = {
    width: number;
    height: number;
}


function ActionsModal({ actions, position, isSubModal = false }: { actions: Action[], position?: Position, isSubModal?: boolean }) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalHeight, setModalHeight] = useState(0);

    useEffect(() => {
        if (modalRef.current) {
            setModalHeight(modalRef.current.offsetHeight);
        }
    }, [actions]);

    let adjustedY;
    const isLowerHalf = position && position.y > window.innerHeight / 2;
    if (position) {
        adjustedY = isLowerHalf ? position.y - modalHeight : position.y;
    }
    return (
        <div
            ref={modalRef}
            className={`${styles.actionsModal} ${isSubModal ? styles.subActionsModal : ''}`}
            style={position ? { top: `${adjustedY}px`, left: `${position.x}px` } : undefined }
        >
            {actions.map(action => (
                <ActionItem key={action.name} action={action} />
            ))}
        </div>
    );
}

function SubActionsModal({ actions, parentPosition, parentDimensions }: { actions: Action[], parentPosition: Position, parentDimensions: Dimensions }) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalHeight, setModalHeight] = useState(0);

    useEffect(() => {
        if (modalRef.current) {
            setModalHeight(modalRef.current.offsetHeight);
        }
    }, [actions]);

    const isLowerHalf = parentPosition.y > window.innerHeight / 2;
    const adjustedY = isLowerHalf ? -modalHeight + parentDimensions.height : 0;

    return (
        <div
            ref={modalRef}
            className={`${styles.actionsModal} ${styles.subActionsModal}`}
            style={{ top: `${adjustedY}px` }}
        >
            {actions.map(action => (
                <ActionItem key={action.name} action={action} />
            ))}
        </div>
    )
}

function ActionItem({ action }: { action: Action }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const actionRef = useRef<HTMLDivElement>(null);
    const [actionPosition, setActionPosition] = useState<Position>({ x: 0, y: 0});
    const [actionDimensions, setActionDimensions] = useState<Dimensions>({ width: 0, height: 0});

    useEffect(() => {
        if (actionRef.current) {
            const rect = actionRef.current.getBoundingClientRect();
            setActionPosition({
                x: rect.left,
                y: rect.top
            });
            setActionDimensions({
                width: rect.width,
                height: rect.height
            })
        }
    }, []);

    return (
        <div ref={actionRef} className={styles.action} onMouseLeave={() => { setIsExpanded(false) }}>
            <div className={styles.iconContainer}></div>
            <button onClick={action.cb} onMouseOver={() => { setIsExpanded(true) }}> {action.name} {action.options && <FaChevronRight />}</button>
            {isExpanded && action.options ? <SubActionsModal actions={action.options} parentPosition={actionPosition} parentDimensions={actionDimensions}/> : null}
        </div>
    )
}

export default ActionsModal;
