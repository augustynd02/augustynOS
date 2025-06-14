import { useCallback, useState } from 'react';
import ActionsContext from './ActionsContext';
import { Action } from '../../types/Action';
import { Position } from '../../types/Position';

export default function ActionsProvider({ children }: { children: React.ReactNode }) {
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalPosition, setModalPosition] = useState<Position>({ x: 0, y: 0 });
    const [actions, setActions] = useState<Action[]>([]);

    const handleOpenModal = useCallback((e: React.MouseEvent, newActions: Action[]) => {
        e.preventDefault();
        setIsModalShown(true);
        setModalPosition({ x: e.clientX, y: e.clientY });
        setActions(newActions);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalShown(false);
    }, []);

    return (
        <ActionsContext.Provider value={{ handleOpenModal, handleCloseModal, modalPosition, isModalShown, actions }}>
            {children}
        </ActionsContext.Provider>
    )
}
