import { render, screen } from '@testing-library/react';
import App from './App';

describe('MyComponent', () => {
    it('renders the taskbar', () => {
        render(<App />);
        expect(screen.getByTestId('taskbar')).toBeInTheDocument();
    });

    it('renders the desktop', () => {
        render(<App />);
        expect(screen.getByTestId('desktop')).toBeInTheDocument();
    })
});
