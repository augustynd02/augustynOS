import { createContext } from 'react';

type Position = {
    x: number;
    y: number;
};

type Action = {
    name: string;
    cb: () => void;
    iconURL?: string;
    options?: Action[];
};

interface ActionsContextType {
    handleOpenModal: (e: React.MouseEvent, newActions: Action[]) => void;
    handleCloseModal: () => void;
    modalPosition: Position;
    isModalShown: boolean;
    actions: Action[];
}

const defaultContext: ActionsContextType = {
    handleOpenModal: () => {},
    handleCloseModal: () => {},
    modalPosition: { x: 0, y: 0 },
    isModalShown: false,
    actions: []
};

const ActionsContext = createContext<ActionsContextType>(defaultContext);

export default ActionsContext;
