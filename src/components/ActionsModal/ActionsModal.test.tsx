import { render, screen, fireEvent } from '@testing-library/react';
import ActionsModal from './ActionsModal';
import { Action } from '../../types/Action';
import { Position } from '../../types/Position';

describe('ActionsModal', () => {
    const mockAction = (name: string): Action => {
        return {
            name: name,
            cb: vi.fn(),
            iconURL: '',
            options: [],
        }
    }

    const defaultPosition: Position = {
        x: 100,
        y: 100
    }

    const actions: Action[] = [
        mockAction('Action 1'),
        mockAction('Action 2'),
        mockAction('Action 3')
    ]

    it('renders action modal with provided actions', () => {
        render(<ActionsModal actions={actions} position={defaultPosition}/>)

        actions.forEach(action => {
            expect(screen.getByText(action.name)).toBeInTheDocument();
        })
    })

    it('shows submodal correctly when hovered over', () => {
        const mockSubActions: Action[] = [
            mockAction('Subaction 1'),
            mockAction('Subaction 2')
        ]

        const actionsWithSubactions: Action[] = [
            {
                ...mockAction('Action 1'),
                options: mockSubActions
            }
        ]

        render(<ActionsModal actions={actionsWithSubactions} position={defaultPosition} />);

        expect(screen.queryByText('Subaction 1')).not.toBeInTheDocument();

        const actionButton = screen.getByText('Action 1')
        fireEvent.mouseOver(actionButton)
        expect(screen.queryByText('Subaction 1')).toBeInTheDocument();

        fireEvent.mouseLeave(actionButton)
        expect(screen.queryByText('Subaction 1')).not.toBeInTheDocument();
    })

    it('calls action callback when an action is clicked', () => {
        render(<ActionsModal actions={actions} position={defaultPosition} />);

        const actionButton = screen.getByText('Action 1');
        fireEvent.click(actionButton);

        expect(actions[0].cb).toHaveBeenCalled();
    });
})
