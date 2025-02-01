import { render, screen } from '@testing-library/react';
import Taskbar from './Taskbar';

describe('MyComponent', () => {
    beforeEach(() => {
        render(<Taskbar />);
    })

    it('renders the start menu', () => {
        expect(screen.getByTestId('startmenu')).toBeInTheDocument();
    });

    it('renders the tabs', () => {
        expect(screen.getByTestId('tabs')).toBeInTheDocument();
    })
});
