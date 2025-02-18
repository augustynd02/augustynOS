import { useState } from 'react';

type Position = {
    x: number;
    y: number;
};

function useActionsModal() {
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalPosition, setModalPosition] = useState<Position>({ x: 0, y: 0});

    const handleOpenModal= (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalShown(true);
        setModalPosition({ x: e.clientX, y: e.clientY });
        const position: Position = {
            x: e.clientX,
            y: e.clientY
        }
        return position;
    }
    const handleCloseModal = () => setIsModalShown(false);

    return {
        handleOpenModal,
        handleCloseModal,
        modalPosition,
        isModalShown
    }
}

export default useActionsModal;
