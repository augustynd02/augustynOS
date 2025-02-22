import { useState } from 'react';
import ActionsContext from './ActionsContext';

type Position = {
    x: number;
    y: number
};
type Action = {
    name: string;
    cb: () => void;
    iconURL?: string;
    options?: Action[]
};

export default function ActionsProvider({ children }: { children: React.ReactNode }) {
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalPosition, setModalPosition] = useState<Position>({ x: 0, y: 0 });
    const [actions, setActions] = useState<Action[]>([]);

    const handleOpenModal = (e: React.MouseEvent, newActions: Action[]) => {
        e.preventDefault();
        setIsModalShown(true);
        setModalPosition({ x: e.clientX, y: e.clientY });
        setActions(newActions);
    };

    const handleCloseModal = () => setIsModalShown(false);

    return (
        <ActionsContext.Provider value={{ handleOpenModal, handleCloseModal, modalPosition, isModalShown, actions }}>
            { children }
        </ActionsContext.Provider>
    )
}
